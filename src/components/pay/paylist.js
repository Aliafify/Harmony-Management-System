import React, { useEffect, useState } from 'react'
import "./payList.css";
import X from "../images/x.ico"
import Method from './paymethods';
import PayItem from './payItem';
import { convertArrToObj, convertObjToArr } from '../glopalFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { Pay_premium } from '../../actions/clients';
import { UpdateGain } from "../../actions/parteners"
import axios from 'axios';
import { delete_method } from '../../actions/PayMethod';
//
function mapStateToProps({ parteners, clients, methods, options }) {
  const clientsarr = clients;
  return { parteners, clientsarr, methods, options }
}
//
function PayList({ clients, deleteName }) {//clients mean chosen cients to pay
  const dispatch = useDispatch()
  const { parteners, clientsarr, methods, options } = useSelector(mapStateToProps);
  const partenersObj = convertArrToObj(parteners, "_id"); // convert parteners array to object
  const clientsArrToObj = convertArrToObj(clientsarr, "identification");
  const [paydata, setPayData] = useState({});
  //
  const setPay = (p) => {
    setPayData({ ...paydata, ...p })
  }
  //
  const onSave = async (e, paydata, partenersObj, clientsArrToObj, clients,cost) => {
    e.preventDefault();
    if (!options.choiceValue) return alert("اختر طريقة الدفع")

    const handelPremium = (paydata, partenersObj, clients,cost) => {
      const keys = Object.keys(paydata);
      const clientsObj = convertArrToObj(clients, "identification")
      const date = new Date();
      let updatedClients = clients.map(el => {
        const id = el.identification;
        const forP = paydata[id].for
        const value = paydata[id].value;
        let oldadvance = clientsObj[id].advance;
        const newAdvance = oldadvance.map(e => {
          if (e.partenerID === forP) {
            e.paied.paied = [...e.paied.paied, value];
            e.paied.date = [...e.paied.date, date];
            return e
          }
        })
        el.advance = newAdvance;
        return el
      });

      const parteners = keys.map(k => {
        const p = partenersObj[paydata[k].for];
        p.bank=parseInt(p.bank) + parseInt(paydata[k].value)
        const oldGainDetails = p.gainDetails
        const gainDetails = oldGainDetails.map(e => {
          if (e.clientIdentification === k) {
            e.exist.value = [...e.exist.value, paydata[k].value];
            e.exist.date = [...e.exist.date, date];
            if(cost!==0){

              e.out.value=[...e.out.value,cost];
              e.out.date=[...e.out.date,date];
            }
          }
          return e
        });
        return { ...p, gainDetails: gainDetails }
      })

      return { parteners, updatedClients }
    }

    const data = await handelPremium(paydata, partenersObj, clients);
    const embid = (obj, ele, id) => {
      let newObj = obj;
      ele.map(e => {
        newObj[e[id]] = e; // embid
      });
      return newObj
    }
    const part = await embid(partenersObj, data.parteners, "_id");
    const cli = await embid(clientsArrToObj, data.updatedClients, "identification");
    const newParteners = await convertObjToArr(part);
    const newClients = await convertObjToArr(cli);

    dispatch(Pay_premium(newClients));
    dispatch(UpdateGain(newParteners));
    await axios({
      method: "put",
      data: { parteners: newParteners, clients: newClients },
      withCredentials: true,
      url: "http://localhost:8080/pay/collection"
    }).then(res => alert(res.data))
    dispatch(delete_method());
  }
  return (
    <div className='name-list' >
      <form onSubmit={(event) => { onSave(event, paydata, partenersObj, clientsArrToObj, clients,options.choiceValue) }}>
        <ol>
          <Method />
          {clients.map(n => <li key={n._id}>
            {n.name}
            <img alt="delete" id={n._id} onClick={(event) => deleteName(event.target.id)} className='ico' src={X} width="20"></img><br>

            </br>
            <br />
            <PayItem client={n} partenersObj={partenersObj} setPay={setPay} />

          </li>)}
        </ol>
        <input type="submit" name="submit" value=" دفع" />
      </form>
    </div>
  )
}

export default PayList
import React,{useState,useRef} from 'react'
import { distribute,gainseparationN,advance } from '../glopalFunctions'
import List from '../create/List';
import "./newDeal.css";
import serializeForm from 'form-serialize';

import { useDispatch, useSelector } from 'react-redux';
import { update_user } from '../../actions/parteners';
import { UpdateC } from '../../actions/clients';
function NewDeal() {
    const {parteners,options}=useSelector(mapStateToProps);
    const [partenerID, setPartenerID] = useState(null);
    const form = useRef();
    const dispatch=useDispatch();
    const handelData = (e) => {
        e.preventDefault();
        if (partenerID) {
            let client = serializeForm(form.current, { hash: true });
            client.partenerID = partenerID;
            
            let [partener] = parteners.filter(p => p._id === partenerID);
            if(partener.bank<client.advance)return alert("لايوجد رصيد كافى فى حساب المستثمر");
            let bank = parseInt(partener.bank) - parseInt(client.advance) + parseInt(client.paied); //update bank credit
            partener.bank = bank;
             const newAdvance = advance(client);
             newAdvance.identification=options.identification
            // console.log(newAdvance)
             const updatedClient ={...options,advance:[...options.advance,newAdvance]}
            const property = gainseparationN(newAdvance, partener);
            partener.gainDetails = property.gainDetails;
            partener.clients = partener.clients + 1;

            console.log(property.gainDetails)
            dispatch(UpdateC(updatedClient));
            dispatch(update_user(partener._id, partener, partener.role));
        } else {
            alert("من فضلك اختر الشريك التابع له العميل")
        }
    }
  return (
<>
<div className="dash-view">

{/* <h1>AddClient</h1> */}
<form className="create-form" ref={form}  onSubmit={(event)=>handelData(event)}>
    <div className="c-h-ar-flex inputes">

        <div className="inputes">

            <input className="num " type="number" name="advance" placeholder="القرض" required />
            <input className="num " type="number" name="excess" placeholder="الفائدة" required /><br />
            <input className="num " type="number" name="paied" placeholder="المقدمة" required /><br />
            <input className="num " type="number" name="period" placeholder="مدة الاقساط بالشهر-" required /><br />
        </div>
    <h3 className='belong'>تابع ل...</h3>
    </div>
    <input id="belong-sub" type="submit" plceholder="اضافة" value="اضافة" />
</form>
<div>
    <List items={parteners}
        outPut={setPartenerID}
        position={`absolute`}
        top={"70vh"}
    />
</div>
</div>
</>
  )
}
function mapStateToProps({parteners,options}){
    parteners = distribute(parteners);
    options =options.client
   return {parteners,options}
}
export default NewDeal
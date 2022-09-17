import React, { useRef, useState } from "react";
import serializeForm from 'form-serialize';
import { useSelector, useDispatch } from "react-redux";
import { filterByname, trimStringData, advance, gainseparation, distribute } from "../glopalFunctions";
import List from "./List";
import { addClient } from "../../actions/clients";
import { update_user } from "../../actions/parteners";

const getPartenersData = ({ parteners, admin }) => {
    parteners=distribute(parteners)
    return { parteners, admin }
}

const AddClient = () => {
    const result = useSelector(getPartenersData)
    const [pn, setPn] = useState([])
    const dispatch = useDispatch();
    const [partenerID, setPartenerID] = useState(null)
    const form = useRef()

    const handelData = (e) => {
        try{
        if (partenerID) {
            e.preventDefault();
            const data = serializeForm(form.current, { hash: true });
            let client = trimStringData(data);
            client.role = "Client"
            client.phone = [client.phone1, client.phone2, client.phone3];
            client.partenerID = partenerID;
            const [partener] = result.parteners.filter(p => p._id === partenerID);
            if(partener.bank<client.advance)return alert("لايوجد رصيد كافى فى حساب المستثمر");
            let bank = parseInt(partener.bank) - parseInt(client.advance) + parseInt(client.paied); //update bank credit
            partener.bank = bank;
            client.advance = advance(client);
            const property = gainseparation(client, partener);
            partener.gainDetails = property.gainDetails;
            partener.clients = partener.clients + 1;
            dispatch(addClient(client, result.parteners, partenerID));
            dispatch(update_user(partener._id, partener, partener.role));
        } else {
            alert("من فضلك اختر الشريك التابع له العميل")
        }
    }catch(e){console.log(e)}
    }
    return (
        <>
            <div className="dash-view">

                {/* <h1>AddClient</h1> */}
                <form className="create-form" ref={form} onSubmit={handelData}>
                    <div className="c-h-ar-flex inputes">


                        <div className="b-v-flex col">
                            <input className="tex" type="text" name="name" placeholder="اسم المستخدم" required />
                            <input className="tex email" type="email" name="email" placeholder="البريد الالكترونى" required />
                            <input className="tex nickname" type="text" name="nickname" placeholder="الاسم المستعار" required />
                            <input className="num" type="number" name="identification" placeholder="الرقم المدنى" />

                        </div>
                        <div className="b-v-flex col">

                            <input className="num " type="text" name="address" placeholder="العنوان" required />
                            <input className="num" type="phone" name="phone1" placeholder=" 1 الهاتف" required />
                            <input className="num" type="phone" name="phone2" placeholder=" 2 الهاتف" />
                            <input className="num" type="phone" name="phone3" placeholder="3 الهاتف" />
                        </div>
                        <div className="b-v-flex col">

                            <input className="num " type="number" name="advance" placeholder="القرض" required />
                            <input className="num " type="number" name="excess" placeholder="الفائدة" required /><br />
                            <input className="num " type="number" name="paied" placeholder="المقدمة" required /><br />
                            <input className="num " type="number" name="period" placeholder="مدة الاقساط بالشهر-" required /><br />
                        </div>
                    </div>
                    <h3>تابع ل...</h3>
                    <div className="choose">
                        <input type="search" name="searchByName"
                            placeholder="البحث بالاسم" onChange={(event) => setPn(filterByname(event.target.value, result.parteners))} />

                    </div>
                    <input type="submit" plceholder="اضافة" value="اضافة" />


                </form>
                <div>
                    <List items={pn}
                        partener={true}
                        outPut={setPartenerID}
                        position={`absolute`}
                        top={"70vh"}
                    />
                </div>
            </div>
        </>
    )
}
export default AddClient; 
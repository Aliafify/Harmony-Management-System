import React, {  useEffect, useRef } from "react";
import serializeForm from 'form-serialize';
import { AddUser } from "../../actions/parteners";
import {  useDispatch } from "react-redux";
import "../style/addPartener&clients.css"
import { trimStringData } from "../glopalFunctions";
import { handelInetialData } from "../../actions/getData";
const AddPartener = () => {
    const dispatch = useDispatch()
    const form = useRef()
    const partenerData = (e) => {
        try{
        e.preventDefault();
        let data = serializeForm(form.current, { hash: true });
        let newData = trimStringData(data);
        newData.role="Partener";
        newData.phone=[newData.phone1,newData.phone2,newData.phone3];
        dispatch(AddUser(newData));
        }catch(e){console.log(e)}
    }
   useEffect(()=>{
    dispatch(handelInetialData());

   },[])
    return (
        <>
            <div className="dash-view">

                <form className="create-form " ref={form} onSubmit={partenerData}>
                    <div className="c-h-ar-flex inputes" >
                    <div className="b-v-flex col"> 
                    <input className="tex" type="text" name="username" placeholder="اسم المستخدم" required />
                    <input className="tex" type="text" name="name" placeholder="الاسم كاملا" required />
                    <input className="tex" type="password" name="password" placeholder="الرقم السرى" required/>
                    <input className="tex " type="email" name="email" placeholder="البريد الالكترونى" required/>
                    </div>
                    <div className="b-v-flex col">

                    <input className="num address" type="text" name="address" placeholder="العنوان" required />
                    <input className="num" type="phone" name="phone1" placeholder="1 الهاتف"required />
                    <input className="num" type="phone" name="phone2" placeholder="2 الهاتف" />
                    <input className="num" type="phone" name="phone3" placeholder="3 الهاتف" />
                    </div>
                    <div className="b-v-flex col">
                    <input className="num" type="number" name="code" placeholder="الكود" required/>
                    <input className="num" type="number" name="identification" placeholder="الرقم المدنى" />
                    <input className="num" type="number" name="finance" placeholder="راس المال" required/>
                    <input className="num" type="number" name="gain" placeholder="% نسبة الارباح" required/><br />
                    </div>
                    </div>
                    <div className="rem">
                    <h3>تابع ل...</h3>
<div className="choose">
                    <label className="company" htmlFor="company">الشركة</label>
                    <input className="company" type="radio"  name="first_partener" value="company" required/><br />
                    <label htmlFor="css">ا\ عبد الله</label>
                    <input type="radio"  name="first_partener" value="mohamed" required/><br />
                    <label htmlFor="javascript">else</label>
                    <input type="radio"  name="first_partener" value="Abd Allah" required />
                    

</div>
                    <input type="submit" plceholder="اضافة" value="اضافة" />
                    </div>

                </form>
            </div>
        </>
    )
}
export default AddPartener;
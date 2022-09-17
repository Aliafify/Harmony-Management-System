import React, { useRef } from "react";
import serializeForm from 'form-serialize';
import { useSelector, useDispatch } from "react-redux";
import { filterByname, trimStringData, advance, gainseparation } from "../glopalFunctions";
import "../style/addWorker.css"
import { Add_Worker } from "../../actions/worker";

const getPartenersData = ({ parteners, admin }) => {
    return { parteners, admin }
}

const AddWorker = () => {
    const result = useSelector(getPartenersData)
    const dispatch = useDispatch();
    const form = useRef()

    const handelData = (e) => {
      e.preventDefault();
      const data = serializeForm(form.current, { hash: true });
      const phone = [data.phone1,data.phone2,data.phone3]
      data.phone=phone;
      dispatch(Add_Worker(data))
    }
    return (
        <>
            <div className="add-cont">

                <form className="create-form" ref={form} onSubmit={handelData}>


                            <input className="tex" type="text" name="username" placeholder="اسم المستخدم" required />
                            <input className="tex" type="password" name="password" placeholder="الرقم السرى" required />
                            <input className="tex email" type="email" name="email" placeholder="البريد الالكترونى" required />
                            <input className="tex" type="text" name="name" placeholder="الاسم" required />
                            <input className="num" type="number" name="identification" placeholder="الرقم المدنى" />
                            <input className="num " type="text" name="address" placeholder="العنوان" required />
                            <input className="num" type="phone" name="phone1" placeholder=" 1 الهاتف" required />
                            <input className="num" type="phone" name="phone2" placeholder=" 2 الهاتف" />
                            <input className="num" type="phone" name="phone3" placeholder="3 الهاتف" />
                            <input className="num " 
                                   type="text" name="job" 
                                   placeholder="الوظيفة" required />
                            <input className="num" type="num" name="sallary" placeholder="المرتب" />

                    <input className="add-sub" type="submit" plceholder="اضافة" value="اضافة" />
                       

                        
                      
                </form>       
            </div>
        </>
    )
}
export default AddWorker; 
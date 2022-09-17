import React, { useRef } from 'react'
import serializeForm from 'form-serialize';
import {useDispatch} from "react-redux";
import { addMethod } from '../actions/PayMethod';
function PayMethods() {
  const dispatch = useDispatch();
  const formRef= useRef()
  const handelForm =(e)=>{
    e.preventDefault();
    const data = serializeForm(formRef.current, { hash: true });
   // let method = trimStringData(data);
    dispatch(addMethod(data))
  }
  return (
    <div className="dash-view">
        <form className='c-v-flex' ref={formRef} onSubmit={(event)=>handelForm(event)}>
            <div className='b-v-flex col'>
            <input className="num" type="text" name="name" placeholder='طريقة الدفع'/><br/>
            <input className='num' type="number" name="cost" step="0.01" placeholder='التكلفة'/>
            <br/><br/>  
            <input type="submit" value="حفظ" />
            </div>
        </form>
    </div>
  )
}

export default PayMethods
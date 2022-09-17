import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { choose_method, delete_method } from '../../actions/PayMethod';
const mapStateToProps = ({methods})=>{
  return methods 
}

function Method() {
  const dispatch = useDispatch();
  const methods =useSelector(mapStateToProps);
  const onChange = (e)=>{
     dispatch(choose_method({choiceValue:e}))
  }
  useEffect(()=>{
   return ()=>{
    dispatch(delete_method())
   }
  },[])
  return (
    <div>
        <select name="اختر طريقة الدفع" onChange={(event)=>{onChange(event.target.value)}}>
          <option > طريقة الدفع...</option>
        {methods.map(m=><option key={m.name} value={m.cost}>{m.name}</option>)}
        </select>
    </div>
  )
}

export default Method
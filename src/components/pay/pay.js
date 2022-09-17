import React from 'react'
import { useSelector } from 'react-redux';
const part = ({parteners})=>{
     return parteners
}
const Pay = ({client}) => {
  const parteners = useSelector(part);
  const filteredParteners =(p)=>{
   const ids = client.advance.map(e=>e.partenerID)
   const part = parteners.filter(p=>ids.includes(p._id))
   return part
  }
  return (
    <div>
      <form>
        <select name = "طريقة الدفع">
         <option value="online">
         </option>
          <option value = "cash"></option>
        </select>
      </form>
    </div>
  )
}

export default Pay;
import React from 'react'

function PayFor({client,onSelect,partenersObj}) {
  try{
  return (
<>
<label htmlFor={client.identification}>الدفع لحساب ...</label>
<select name={client.identification} onChange={event=>onSelect(event.target.value)}>
{client.advance.map(c=>
<option key={c.partenerID}  value={c.partenerID}>{partenersObj[c.partenerID].name}</option>)}
    </select>
</>  )
  }catch(e){console.log(e)}
}

export default PayFor
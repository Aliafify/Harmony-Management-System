import React, { useEffect, useRef, useState } from 'react'
import PayFor from './PayFor';

function PayItem({client,partenersObj , setPay}) {
  const [forRef,setFor] =useState("");
  const valueRef= useRef();
  const handelChoose = (v)=>{
    try{
    const d =  {[client.identification]:{value:v,for:client.advance.length>1?forRef:client.advance[0].partenerID}};
    setPay(d);
    }catch(e){console.log(e)}
  }
  console.log(client.advance)
  const onSelect=(value)=>{ 
      try{
        setFor(value)
        if(valueRef.current.value){valueRef.current.value=0} 
    }catch(e){console.log(e)}
    }

   
  return (
    
    <>
{client.advance.length > 1&& <PayFor client={client} onSelect={onSelect} partenersObj={partenersObj}/> }
<input type="number" ref={valueRef} name="value" onChange={(event)=>handelChoose(event.target.value)} required />
    </>
  )
}

export default PayItem
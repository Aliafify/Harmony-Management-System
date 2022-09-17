import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import "./partenerReport.css"
import Table from '../table';
import { convertArrToObj } from '../glopalFunctions';
import Table2 from '../table2';
import { inetializeC } from "../../actions/clients";

function PartenerRport() {
  const dispatch=useDispatch()
  useEffect(()=>{
   dispatch(inetializeC());//inetialize clients

  },[]) 
  const {options,clients}=useSelector(mapStateToProps);
   const clientsObj = convertArrToObj(clients,"identification");
   const part = options
   const data1={
     الاسم :part.name,
     "رقم الهاتف":part.phone.join('/'),
     "العنوان" :part.address,
     "البريد الالكترونى" : part.email,
     "تاريخ اول تمويل " : part.date,
     "رقم البطاقة" : part.identification,
     "حساب المستخدم":part.username,
     "الكود": part.code,
     "عدد العملاء" : part.clients,
     "مبلغ التمويل الكلى ":part.finance,
     "الموجود بالبنك": part.bank,

    }
     let totReq=[[],[],[],[]] //[الاسم ,  القرض , الربح المتوقع , المدفوع , ]
   
   if(clients.length){for(let i=0; i<part.gainDetails.length; ++i){
      const g = part.gainDetails[i];
      totReq[0].push(clientsObj[g.clientIdentification].name);
      const adv = clientsObj[g.clientIdentification].advance;
      const [_adv]=adv.filter(a=>a.partenerID===part._id&a.paied.date[0].split("-")[1]===g.exist.date[0].split("-")[1])
      totReq[1].push(_adv.advance);
      totReq[2].push(g.req);
      const totpaied = _adv.paied.paied.reduce((a,b)=>parseInt(a)+parseInt(b),0);
      totReq[3].push(totpaied);
    } 
  }
    const data2={
      // "الرصيد المتاح" : part.bank,
    "الاسم" :totReq[0], 
      "القرض":totReq[1] ,
      " الربح المتوقع":totReq[2] ,
        "المدفوع":totReq[3]

    }

    return (
    <>
    <div className='part-report-cont'>
        <Table title={"بيانات المستثمر"} rowNum={4} coulmnNum={3} data={data1} />
        <Table2 title={"المعاملات المالية"} data={data2}/>
    </div>
    </>
  )
}
function mapStateToProps({options,clients,user}){
  user=user.user
  options=options.partener
  if(user.role==="Partener"){
    options = user
  }
  return{options,clients,user}
}
export default PartenerRport
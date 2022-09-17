import React from 'react'
import {  useSelector } from 'react-redux';
import Table from '../table';
import { convertArrToObj, getdate } from '../glopalFunctions';
import Table2 from '../table2';
import "./clientReport.css"
function ClientRport() {
  const {options,parteners}=useSelector(mapStateToProps);
  
   const partenersObj = convertArrToObj(parteners,"_id");
   const part = options.client
   const data1={
     الاسم :part.name,
     "رقم الهاتف":part.phone.join('/'),
     "العنوان" :part.address,
     "البريد الالكترونى" : part.email,
     "الرقم المدنى" : part.identification,
     "الحالة"  : part.state
    }
    //  let paymentData=[[],[],[],[]] //[الاسم ,  القرض , الربح المتوقع , المدفوع , ]
    const clientHandel = (c,parteners,getDate)=>{
         let extracted = []
         let dates=[]
        for(let i=0; i<c.advance.length; ++i){
          const data = c.advance[i];
          const partener = parteners[data.partenerID] // العميل التابع 
          const dataObj= {'المطلوب': data.total,'المدة بالشهور':data.period,
                         "اصل القرض":data.advance,
                         "المستثمر":partener.name}
          extracted.push(dataObj);
          const paiedDates = data.paied.date.map(d=>{ 
             return getDate(d).join('/');
          })
          const supposedDates = data.times.time.map(t=>{
            return getDate(t).join('/');
          })
          const payments = {"الموعد":supposedDates,"المطلوب":data.times.value,'التاريخ':paiedDates,"المدفوع":data.paied.paied};// المدفوعات والتواريخ ,  المطلوب دفعه والتواريخ
          dates.push(payments)
        } 
        return {extracted,dates}
     }
     const dataArr = clientHandel(options.client,partenersObj,getdate);
   console.log(dataArr)
    return (
    <>
    <div className='report-container'>
    <div className='report-sub-cont'>
        <Table data={data1} coulmnNum={3} rowNum={2} title={"بيانات العميل"}/>
        {dataArr.extracted.map(d=><>
            <Table data={d} coulmnNum={4} rowNum={1} title={""}/>
        
        </>)}
        {dataArr.dates.map(d=><Table2 title={"تفاصيل القرض"} data={d}/>)}
    </div>
    </div>
    </>
  )
}
function mapStateToProps({options,parteners}){
  return{options,parteners}
}
export default ClientRport
// find element in an array  
export const findByID =(c,p,id)=>{
 return c.filter(e=> e[p] === id)
}
// ----filter by name
export const filterByname = (value, source) => {
  try {
    let data = [];

    if (value !== "") {
      const newValue = value.trim();
      //let arr= source.filter((p) => p.name );
      data = source.filter((p) => p.name.includes(newValue));
      return data
    }
    else {
      return source;
    }
  } catch (err) {
    console.log(err)
  }

}

export const filterByPhone = (value, source) => {
  try {
    if (value !== "") {
      const newValue = value.trim();
      return source.filter((p) => p.phone.includes(newValue))
    } else {
      return source
    }
  } catch (e) {
    console.log(e)
  }

}
export const filterByEmail = (value, source) => {
  try {
    if (value !== "") {
      const newValue = value.trim();
      return source.filter((p) => p.email.includes(newValue))
    } else {
      return source
    }
  } catch (e) {
    console.log(e)
  }
}
export const filterByIdentefication = (value, source) => {
  try {
    if (value !== "") {
      const newValue = value.trim();
      return source.filter((p) => p.identification.toString().includes(newValue))
    } else {
      return source
    }
  } catch (e) {
    console.log(e)
  }

}


//-----trim String object data-------
export const trimStringData = (data) => {

  const keys = Object.keys(data);
  let newObj = {}
  keys.forEach(e => {
    if (typeof (data[e]) == "string") {
      newObj[e] = data[e].trim();
    }
    else {
      newObj[e] = data[e]
    }
  })
  return newObj
}
//-----convert array to object------
export function convertArrToObj(arr,key){
     let obj ={};
     for(let i =0 ; i<arr.length; i++){
      const newkey = arr[i][key] ;
      obj[newkey] = arr[i];
     }
     return obj;
}
//-------استحقاق القسط تاريخ ------
export const findDate = (advance) => {
  try {
    const dat = new Date();
    const mon = dat.getMonth()+1
    const ye = dat.getFullYear();
    let date = [];
    //console.log(advance)
    advance.times.time.forEach((t, i) => {
      const oldDate =getdate(t)
      const day=parseInt(oldDate[2])
      const month = parseInt(oldDate[1]);
      const year =parseInt(oldDate[0]);
      if (month === mon & year === ye){ 
        date=[i, [day,month,year]]
      }
      // else if(month-mon===1){
      //   date=[advance.times.time[0]]
      // }
      
      
      
    })
    return date
  } catch (e) { console.log(e) }
}
//----- التاخيرات والرصيد المتاح , اذا كان الرصيد + يعنى عدم وجود تاخيرات والعكس -------
export const late = (advance) => {
  try{
  if(!findDate(advance)) return 0
  const requiredMon = findDate(advance);
  const paied =advance.paied.paied;
  const totPaied = paied.reduce((a,b)=>parseInt(a)+parseInt(b),0);
  const valuePerTime = advance.valuePerTime;
  const paiedRatio = totPaied/valuePerTime;//
  const month = requiredMon[1][1];// الشهر المطلوب دفعه الحالى
  const monthOrder = requiredMon[0]+1;//عدد الشهور الى الان
  const dayToPay = parseInt(requiredMon[1][0]); //يوم الدفع
  const today = new Date().getDate();  // اليوم الحالى

  var delay=0;
  var ammount=0;
  if (paiedRatio < monthOrder&& dayToPay< today) {
    delay = monthOrder - paiedRatio
    ammount = (-1 * delay *valuePerTime).toFixed(0)
    delay=delay.toFixed(0);
  }
  if (paiedRatio < monthOrder&& dayToPay>= today) {
    delay = (monthOrder - paiedRatio)
    ammount = (-1 * delay * valuePerTime).toFixed(0);
    delay=delay.toFixed(1)
  }
  if (paiedRatio >= month) {
    delay = paiedRatio - monthOrder;
    ammount = delay * valuePerTime;
  }
  return { delay: delay, ammount: ammount }

  }catch(e){console.log(e)}
}
//------ لعميل جديد سحب القرض ----------
export function advance(client) {
  try{
  const [advance ,excess,period,partenerID,paied] = [client.advance,client.excess,client.period,client.partenerID,client.paied]
  let total = parseInt(advance) + (advance * (parseInt(excess) / 100))
  let date = new Date();
  const payment = {paied:[paied],date:[date]}
  let generateDate = (dat) => {
    var month = dat.getUTCMonth() + 2
    var day = dat.getDate();
    var year = dat.getFullYear();
    var valuePerTime = total/period;
    return { day: day, month: month, year: year, valuePerTime: valuePerTime }
  }
  let advanceDetails = (val) => {
    let time = [];
    let value = []
    for (let i = 1; i <= period; i++) {
      let mon = val.month - 1
      if (parseInt(mon) % 12 === 0) {
        const ratio = parseInt(mon) / 12
        val.month = parseInt(val.month)-(12 * ratio);
        val.year = parseInt(val.year) + 1
        var ti = new Date(`${val.month} ${val.day} , ${val.year} 23:59:00 `)
      } else {
        var ti = new Date(`${val.month} ${val.day} , ${val.year} 23:59:00 `)
      }
      time.push(ti);
      value.push(val.valuePerTime)
      val.month = val.month + 1;
    }
    let details = { times: { time: time, value: value }, excess: excess,valuePerTime:val.valuePerTime }
    return details
  }
  return {total:total,paied:payment,period:period,advance:advance,partenerID:partenerID,...advanceDetails(generateDate(date))}
  }catch(e){console.log(e)}
}
//-------للقرض الاول توزيع الارباح ----------
//gainDetails:[], //[{req:Number,exist:Number,clientID:Number,out:{value:[],reason:[],date:[]}}],
//-------اثناء تسجيل العميل اخذ قرض لاول مرة 
export function gainseparation(c,partener){
  try{
  //const [partener] = findByID(parteners, "_id" ,partenerID);
  //const [client] = findByID(c.advance,"partenerID",partenerID); // advance is an array contain object for each advance 
  let client = c.advance;
  const date = new Date();
  const partenerGainRatio = parseInt(partener.gain)/100; //ratio 
  const clientAdvance = client.advance;
  const totalGain = parseInt(clientAdvance * (parseInt(client.excess) / 100));
  const partenerGain = partenerGainRatio * totalGain ;
  const companyGainFor = partener.first_partener;  
  const companyGain =totalGain-partenerGain;
  const gainDetails = [...partener.gainDetails,
                       {original:clientAdvance,
                        req:partenerGain,
                        exist:{value:[c.paied],date:[date]},
                        clientIdentification:c.identification,
                        out:{value:[],date:[]},
                        }] //partener Gain Details
  return {gainDetails:gainDetails,cGain:companyGain,cGainFor:companyGainFor}
                      }catch(e){console.log(e)}
}
//---- سحب قرض لعميل مسجل
export function gainseparationN(client,partener){
  try{
  const date = new Date();
  const partenerGainRatio = parseInt(partener.gain)/100; //ratio 
  const clientAdvance = client.advance;
  const totalGain = parseInt(clientAdvance * (parseInt(client.excess) / 100));
  const partenerGain = partenerGainRatio * totalGain ;
  const companyGainFor = partener.first_partener;  
  const companyGain =totalGain-partenerGain;
  const gainDetails = [...partener.gainDetails,
                       {original:clientAdvance,
                        req:partenerGain,
                        exist:{value:[client.paied],date:[date]},
                        clientIdentification:client.identification,
                        out:{value:[],date:[]},
                        }] //partener Gain Details
  return {gainDetails:gainDetails,cGain:companyGain,cGainFor:companyGainFor}
}catch(e){
  console.log(e);
}
}
// --------convert obj to arr
export const convertObjToArr = (obj)=>{
  const keys = Object.keys(obj);
  let arr = [];
  keys.forEach(k => {
     arr.push(obj[k])
  })
  return arr

}
//convert date as an array of year , month , day
export function getdate(date){
   const arr =date.split("-");
   const year=arr[0];
   const month =arr[1];
   const arr1 =arr[2].split('T');
   const day = arr1[0];
return [year,month,day]   
}
//sort by date
const sortByDate=(a,b)=>{
   const date1 =getdate(a.date);
   const date2 =getdate(b.date)
   if(date1[0]-date2[0] !== 0)return date1[0]-date2[0]
   if(date1[1]-date2[1] !== 0)return date1[1]-date2[1]
   if(date1[2]-date2[2] !== 0)return date1[2]-date2[2]
}
//sort by last deal
const sortByLastDeal=(a,b)=>{
  const lastClient1 = a.gainDetails.pop();
  const lastClient2 = b.gainDetails.pop();

  const date1 =getdate(lastClient1.exist.date[0]);
  const date2 =getdate(lastClient2.exist.date[0])
  if(date1[0]-date2[0] !== 0)return date1[0]-date2[0]
  if(date1[1]-date2[1] !== 0)return date1[1]-date2[1]
  if(date1[2]-date2[2] !== 0)return date1[2]-date2[2]
}
// ترتيب المستثمرين حسب الاولوية فى اعطاء قرض للعملاء فان تساوو فعلى حسب الاقدمية فى التسجيل
export const distribute =(arr)=>{
  try{
// separate them into 2 parts , one for parteners with no clients , seconde parteners with clients
const noClients =arr.filter(a=>a.clients==0);
const withClients= arr.filter(a=>a.clients>0);
// distribute noClients according to registration date 
const sortedNoClients =noClients.sort((a,b)=>sortByDate(a,b));
//distribute withClients according to last deal
const sortedWithClients= withClients.sort((a,b)=>sortByLastDeal) 
return [...sortedNoClients,...sortedWithClients];
  }catch(e){console.log(e)}
}
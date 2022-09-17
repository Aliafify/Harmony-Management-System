import axios from "axios";
// ------------inetialize admins --------
// export const getAdmins = ()=>{
//     return fetch('http://localhost:8080/admins').then((state)=>(state.json()))
   
// } 
export const getAdmins = ()=>{
  return  axios({
      method: "get",
      url: "http://localhost:8080/admins",
      responseType:"json"
    })
}
//-------------inetialize parteners
export const getParteners=()=>{
    return fetch('http://localhost:8080/parteners').then((parteners)=>(parteners.json()))
}
//----------login -----------
export const getAuthedUser = (authentcation)=>{
    return  axios({
        method: "POST",
        data: {
          username: authentcation.username,
          password: authentcation.password,
        },
        withCredentials: true,
        url: "http://localhost:8080/login",
      }).then((res) => (res.data));
}
//--------check login statue-----------
export const intializeUser= ()=>{
    return fetch("http://localhost:8080/auth",{
       credentials: "include",
     }).then(res=>res.json()).then(user=>(user)).catch(err=>{console.log(err)})
}
//---------create partener----------
export const createUser = (user)=>{
     return axios({ 
      method:"post", 
      data:user,
      withCredentials:true,
      url:`http://localhost:8080/register/partener`

     })
}
// ---------------create client ---------
export const createClient =(client)=>{
  return axios({
    method:"post",
    data:client,
    withCredentials:true,
    url:`http://localhost:8080/client/create`//create client end point
  })
}
//-------inetialize clients -----------
export const inetialize=()=>{
  return fetch('http://localhost:8080/clients').then((clients)=>(clients.json()))

}
//--------update client --------------
export const update_Client=(data)=>{//data is an object
  return axios({
    method:"put",
    data:{property:data,type:"client",id:data._id},
    withCredentials:true,
    url:`http://localhost:8080/update`//update client end point
  })
}
// export const update_Partener=(data)=>{//update partener gainDetails
//   return axios({
//     method:"put",
//     data:{property:data[0],type:"partener",id:data[1]},
//     withCredentials:true,
//     url:"http://localhost:8080/update"//update partener end point
//   })
// }
//--- update partener --------
export const update_P=(id,property,role)=>{//data is an object
  return axios({
    method:"put",
    data:{property:property,type:role,id:id},
    withCredentials:true,
    url:`http://localhost:8080/update`//update end point
  })
}
//------- Payment Methods-------
// 1- add new
export const addNewMethod = (method)=>{
 return axios({
  method:"post",
  data:method,
  withCredentials:true,
  url:"http://localhost:8080/add/paymethod" // add payment method end point
 })
}
// 2- inetialize methods
export const inetializePayMethods = ()=>{
         return axios({
          method: "get",
          url: "http://localhost:8080/get/paymethod",
          responseType:"json"
        })
}
export const createWorker=(data)=>{
  return axios({
    method:"post",
    data:data,
    withCredentials:true,
    url:"http://localhost:8080/register/addworker" // add payment method end point
  })
}
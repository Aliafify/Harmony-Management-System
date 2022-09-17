 const logger =(store)=>(next)=>(action)=>{

    const data =store.getState();

    //  console.log('action is :',action.type)
    //  console.log("data:" ,data)
    //  console.log("partener_:" ,action.user)

    //  console.log(action);
    return next(action);
}
export default logger;
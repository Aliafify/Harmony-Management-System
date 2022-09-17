import { createWorker } from "../utils/API";

export const ADD_WORKER="ADD_WORKER";

const addWorker=(worker)=>{
    return{
        type:ADD_WORKER,
        worker
    }
}
export const Add_Worker = (worker)=>{
  return (dispatch)=>{
    dispatch(addWorker(worker))
    return createWorker(worker).then(res=>{
        alert(res.data)
    })
  }
}
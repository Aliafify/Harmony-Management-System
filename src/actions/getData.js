import { getParteners } from "../utils/API";

export const RECIVE_DATA="RECIVE_DATA";
// action creator 
export const ReciveData = (parteners)=>{

    return {
        type : RECIVE_DATA, 
        parteners,
    }
}
export const handelInetialData=()=>{
    return (dispatch)=>{
        return getParteners().then((parteners)=>{
            dispatch(ReciveData(parteners))
        })
    }
}
import { createUser,update_P,update_Partener } from "../utils/API";
export const NEW_USER = "NEW_USER";
export const DELETE_USER="DELETE_USER";
export const UPDATE_USER ="UPDATE_USER";
export const UPDATE_USER_GAIN = "UPDATE_USER_GAIN";

//new partener
const newUser = (user)=>{//action creator
     return {
        type:NEW_USER,
        user
     }
}
const deleteUser =(user)=>{
    return {
        type:DELETE_USER,
        user
    }
}
const updateUser=(id,property)=>{
   return {
    type:UPDATE_USER,
    id,
    property
   }
}
export const updateUserGain = (parteners)=>{// when client pay premium
    return {
        type : UPDATE_USER_GAIN,
        parteners
    }
}
export const AddUser = (user)=>{  // middle ware function
    return (dispatch)=>{
        dispatch(newUser(user))
        return createUser(user).then(
            (res)=>{
             if (res.data==="exist"||res.err){
                 dispatch(deleteUser(user))
                }
                alert(res.data)
                if(res.err)alert(res.err)
            }
        )
 
    }
}
//--- update partener---
export const update_user = (id,property,role)=>{
    return(dispatch)=>{
        dispatch(updateUser(id,property))
        return update_P(id,property,role).then(res=>{
            if(res.status===200)return  alert("تم التحديث")})
    }
}
export const UpdateGain = (parteners)=>{
    return (dispatch)=>{
       dispatch(updateUserGain(parteners))
    }
}

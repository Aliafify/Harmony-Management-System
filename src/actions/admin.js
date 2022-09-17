import { getAdmins, update_P } from "../utils/API";

export const UPDATE_ADMIN = "UPDATE_ADMIN";
export const INETIALIZE_ADMIN ="INETIALIZE_ADMIN"
const updateAdmin = (name , property)=>{
   return {
    type:UPDATE_ADMIN,
    name,
    property
   }
}
const inetializeAdmin = (state)=>{
    return {
        type:INETIALIZE_ADMIN,
        state
    }
}
export const update_admin = (name,property)=>{
    return (dispatch)=>{
        dispatch(updateAdmin(name,property));
        return update_P(name , property , property.role);
    }
}
export const inetialize_admin = ()=>{
    return (dispatch)=>{
        return getAdmins().then((state)=>{
               dispatch(inetializeAdmin(state.data))
        })
    }
}

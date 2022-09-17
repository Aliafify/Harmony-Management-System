import { INETIALIZE_ADMIN, UPDATE_ADMIN } from "../actions/admin";
export const admin=(state=[],action)=>{
   switch(action.type){
    case INETIALIZE_ADMIN: 
       return state = [...action.state]
    case UPDATE_ADMIN : 
    return state = state.map(s=> s.name===action.name && {...s,...action.property})
    default : return state
   }
}
import { AUTH_LOGIN } from "../actions/login";
export const user=(state={},action)=>{
   switch(action.type){
    case AUTH_LOGIN : 
    return action.user
    default : return state
   }
}
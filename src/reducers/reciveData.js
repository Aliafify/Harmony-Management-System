import { RECIVE_DATA } from "../actions/getData";
import { NEW_USER,DELETE_USER ,UPDATE_USER_GAIN, UPDATE_USER} from "../actions/parteners";
// parteners reducer
export const parteners = (state=[],action)=>{
   switch(action.type){
       case RECIVE_DATA :
           return state = action.parteners
      case NEW_USER:
         return state= 
         [...state,action.user]
      case DELETE_USER : 
         return state.filter(s=>s.username!==action.user.username)
      case UPDATE_USER :
         return state.map(s=>s._id===action.id? {...s,...action.property}:s)
      case UPDATE_USER_GAIN :
        return state=action.parteners
        default: return state
   }
} 
// export const admin = (state=[],action)=>{  
//    switch(action.type){
//        case NEW_USER :
//            return state = [...state,...action.user]
//         default: return state
//    }
// }


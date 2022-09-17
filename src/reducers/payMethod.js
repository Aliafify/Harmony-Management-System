import { ADD_METHOD, INETIALIZ_METHODS,CHOOSE_METHOD ,DELETE_METHODE} from "../actions/PayMethod";
export const methods = (state=[] ,action)=>{
    switch(action.type){
        case ADD_METHOD: 
        return state = [...state,action.method]
        case INETIALIZ_METHODS: 
           return action.methods
        default : return state
    }
}
export const options = (state={},action)=>{
    switch(action.type){
        case CHOOSE_METHOD : 
         return state = {...state,...action.choice}
         case DELETE_METHODE:
         return state = {choiceValue:null}
         default : return state
    }
}
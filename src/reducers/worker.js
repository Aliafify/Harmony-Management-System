import { ADD_WORKER, Add_WORKER } from "../actions/worker";

export const workers=(state=[],action)=>{
switch(action.type){
    case ADD_WORKER:
        return state=[...state,action.worker]
        default : return state
}
}
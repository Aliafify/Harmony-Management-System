import { NEW_CLIENT, DELETE_CLIENT, UPDATE_CLIENT, INETIALIZE_CLIENTS, PAY_PREMIUM } from "../actions/clients"

export const clients = (state = [], action) => {
    switch (action.type) {
        case INETIALIZE_CLIENTS:
            return state=[...action.clients]
        case NEW_CLIENT:
            return state = [...state, action.client]
        case DELETE_CLIENT:
            return state.filter(c => c.identification !== action.client.identification)
        case UPDATE_CLIENT:
            return state.map(c => { if (c._id === action.client._id){ return action.client}else{return c}})
        case PAY_PREMIUM :
            return state = action.clients
        default: return state 
    }
} 
 
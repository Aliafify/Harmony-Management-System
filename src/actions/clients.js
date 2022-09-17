import { createClient, inetialize, update_Client, update_Partener } from "../utils/API";
import { gainseparation } from "../components/glopalFunctions.js"
import { updateUserGain } from "./parteners";
export const NEW_CLIENT = "NEW_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const INETIALIZE_CLIENTS = "INETIALIZE_CLIENTS";
export const PAY_PREMIUM = "PAY_PREMIUM" ;

//-----------actions-----------
const newClient = (client) => {
    return {
        type: NEW_CLIENT,
        client
    }
}
const deleteClient = (client) => {
    return {
        type: DELETE_CLIENT,
        client
    }
}
const updateClient = (client) => {
    return {
        type: UPDATE_CLIENT,
       client

    }
}
const inetializeClients = (clients) => {
    return {
        type: INETIALIZE_CLIENTS,
        clients
    }
}
const payPremium = (clients)=>{
    return {
        type:PAY_PREMIUM,
        clients
    }
}
//------------inetialize clients
export const inetializeC = () => {
    return (dispatch) => {
        return inetialize().then((clients) =>
            dispatch(inetializeClients(clients))
        )
    }
}
export const addClient = (client) => {
    return (dispatch) => {
        return createClient(client).then((res) => {
            if (res.data.state !== "this identification exists") {
                dispatch(newClient(res.data.client));
            }
            else { dispatch(deleteClient(client)) }
            alert(res.data.state)
        })
    }
}
export const UpdateC = (client) => {
    return (dispatch)=> {
        dispatch(updateClient(client));
        update_Client(client).then(res => alert(res.data))
    }
}
export const Pay_premium = (clients)=>{
     return (dispatch)=>{
        dispatch(payPremium(clients))
     }
}
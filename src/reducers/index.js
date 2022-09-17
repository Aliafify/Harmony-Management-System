import { combineReducers } from "redux";
import { parteners } from "./reciveData";
import {user} from "./loggedUser";
import { clients } from "./clients";
import { methods ,options} from "./payMethod";
import {admin} from "./admin";
import {workers} from "./worker"
export default combineReducers({
    user,
    parteners,
    clients,
    workers,
    admin,
    methods,
    options,
    
});
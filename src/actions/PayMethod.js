import { addNewMethod, inetializePayMethods } from "../utils/API";
export const ADD_METHOD = "ADD_METHOD";
export const INETIALIZ_METHODS ="INETIALIZE_METHODS";
export const CHOOSE_METHOD = "CHOOSE_METHOD";
export const DELETE_METHODE = "DELETE_METHOD" ;
export const addMethodAction = (method)=>{
    return {
       type: ADD_METHOD,
       method,
    }
}
const inetializMethods = (methods)=>{
    return{
        type:INETIALIZ_METHODS,
        methods
    }
}
const chooseMethod=(choice)=>{
    return {
        type:CHOOSE_METHOD,
        choice
    }
}
const deleteMethod = ()=>{
    return{
        type:DELETE_METHODE
    }
}
export const addMethod = (method)=>{
    return (dispatch)=>{
        dispatch(addMethodAction(method))
        return addNewMethod(method).then(res=>alert(res.data))
        
    }
}
export const inetialize_methods =()=>{
    return (dispatch)=>{
       return inetializePayMethods().then(methods=>dispatch(inetializMethods(methods.data))
       )
    }
}
export const choose_method =(choice)=>{
     return (dispatch)=>{
         dispatch(chooseMethod(choice))
     }
}
export const delete_method = ()=>{
    return (dispatch)=>{
         dispatch(deleteMethod())
    }
}
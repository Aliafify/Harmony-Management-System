import { getAuthedUser, intializeUser } from "../utils/API";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const authedUser = (user) => {
    return {
        type: AUTH_LOGIN,
        user,
    }
}
export const logIn = (authentcation) => {
    return (dispatch) => {
        return getAuthedUser(authentcation).then((user) => {
            dispatch(authedUser(user))
        })
    }
}
export const intializeLogIn = () => {
    return (dispatch) => {
        return intializeUser().then((user) => {
            dispatch(authedUser(user))
        })
    }
}
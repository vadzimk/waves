import {T} from "../actions/types";

export default (state={}, action)=>{
switch (action.type) {
    case T.REGISTER_USER:
        return {
            ...state,
            register: action.payload
        };
    case T.LOGIN_USER:
        return {
            ...state,
            loginSuccess: action.payload,
        };
    case T.AUTH_USER:
        return {
            ...state,
            userData: action.payload};
    case T.LOGOUT_USER:
        return state;
    default:
        return state;
}
}
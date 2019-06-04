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
    case T.ADD_TO_CART_USER:
        return {
            ...state,
            userData: {
                ...state.userData,
                cart: action.payload
            }
        };
    case T.GET_CART_ITEMS_USER:
        return {
            ...state,
            cartDetail: action.payload,
        };
    case T.REMOVE_CART_ITEM_USER:
        return {
            ...state,
            cartDetail: action.payload.cartDetail,
            userData: {
                ...state.userData,
                cart: action.payload.cart
            }
        };
    default:
        return state;
}
}
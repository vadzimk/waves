import {T} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case T.GET_PRODUCTS_BY_SELL:
            return {
                ...state,
                bySell: action.payload
            };
        case T.GET_PRODUCTS_BY_ARRIVAL:
            return {
                ...state,
                byArrival: action.payload
            };
        case T.GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            };
        case T.GET_ATTRIBUTE1:
            return {
                ...state,
                attribute1: action.payload
            };
        case T.GET_ATTRIBUTE2:
            return {
                ...state,
                attribute2: action.payload
            };
        default:
            return state;
    }
}
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
        default:
            return state;
    }
}
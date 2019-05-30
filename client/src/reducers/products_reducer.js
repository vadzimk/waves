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
        case T.ADD_BRAND:
            return {
                ...state,
                addBrand: action.payload.success,
                brands: action.payload.brands,
            };
        case T.CLEAR_BRAND:
            return {
                ...state,
                addBrand: action.payload,
            };
        case T.GET_ATTRIBUTE1:
            return {
                ...state,
                attribute1: action.payload
            };
        case T.ADD_ATTRIBUTE1:
            return {
                ...state,
                addAttribute1: action.payload,
                attribute1: action.payload.attribute1,
            };
        case T.CLEAR_ATTRIBUTE1:
            return {
                ...state,
                addAttribute1: action.payload,
            };
        case T.GET_ATTRIBUTE2:
            return {
                ...state,
                attribute2: action.payload
            };
        case T.GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size,
            };
        case T.ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload,
            };
        case T.CLEAR_PRODUCT:
            return {
                ...state,
                addProduct: action.payload,
            };

        default:
            return state;
    }
}
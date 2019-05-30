import axios from 'axios';
import {T} from "./types";

import {PRODUCT_SERVER} from "../components/utils/misc";

export const getProductsBySell = () => {
    //articles?sortBy=sold&order=desc&limit=4
    const request = axios.get(PRODUCT_SERVER + '/articles?sortBy=sold&order=desc&limit=4')
        .then(res => res.data);
    return {
        type: T.GET_PRODUCTS_BY_SELL,
        payload: request,
    }
};
export const getProductsByArrival = () => {
    //articles?sortBy=createdAt&order=desc&limit=4
    const request = axios.get(PRODUCT_SERVER + '/articles?sortBy=createdAt&order=desc&limit=4')
        .then(res => res.data);
    return {
        type: T.GET_PRODUCTS_BY_ARRIVAL,
        payload: request,
    };
};

export const getProductsToShop = (skip, limit, filters = [], previousState = []) => {
    //data object will be sent to the db:
    const data = {
        limit,
        skip,
        filters
    };

    const request = axios.post(PRODUCT_SERVER + '/shop', data)
        .then(res => {
            let newState = [
                ...previousState,
                ...res.data.articles];
            return {
                size: res.data.size,
                articles: newState,
            }
        });
    return {
        type: T.GET_PRODUCTS_TO_SHOP,
        payload: request,
    };
};

//Adds a new product to the db
export const addProduct = (dataToSubmit) => {
    const request = axios.post(PRODUCT_SERVER + '/article', dataToSubmit).then(res => res.data);
    return {
        type: T.ADD_PRODUCT,
        payload: request,
    };
};

//Clears the redux store from the last added new product
export const clearProduct = () => {
    return {
        type: T.CLEAR_PRODUCT,
        payload: '',
    };
};


///////////////////////////////
// Categories //
///////////////////////////////

export const getBrands = () => {
    const request = axios.get(PRODUCT_SERVER + '/brands')
        .then(res => res.data);
    return {
        type: T.GET_BRANDS,
        payload: request,
    }
};

export const addBrand = (dataToSubmit, existingBrands) => {
    const request = axios.post(PRODUCT_SERVER + '/brand', dataToSubmit)
        .then(res => {
            let brands = [
                ...existingBrands,
                res.data.brand,
            ];
            return {
                success: res.data.success,
                brands
            }
        });

    //didn't catch error from the server in case request was unsuccessful
    return {
        type: T.ADD_BRAND,
        payload: request
    };
};

//Clears the redux store from the last added new brand
export const clearBrand = () => {
    return {
        type: T.CLEAR_BRAND,
        payload: '',
    };
};

export const getAttribute1 = () => {
    const request = axios.get(PRODUCT_SERVER + '/attribute1')
        .then(res => res.data);
    return {
        type: T.GET_ATTRIBUTE1,
        payload: request,
    }
};

//Clears the redux store from the last added new brand
export const clearAttribute1 = () => {
    return {
        type: T.CLEAR_ATTRIBUTE1,
        payload: '',
    };
};

export const addAttribute1 = (dataToSubmit, existingAttribute1) => {
    const request = axios.post(PRODUCT_SERVER + '/attribute1', dataToSubmit)
        .then(res => {
            let attribute1 = [
                ...existingAttribute1,
                res.data.attribute1,
            ];
            return {
                success: res.data.success,
                attribute1
            }
        });

    //didn't catch error from the server in case request was unsuccessful
    return {
        type: T.ADD_ATTRIBUTE1,
        payload: request
    };
};


export const getAttribute2 = () => {
    const request = axios.get(PRODUCT_SERVER + '/attribute2')
        .then(res => res.data);
    return {
        type: T.GET_ATTRIBUTE2,
        payload: request,
    }
};
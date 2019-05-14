import axios from 'axios';
import {T} from "./types";

import {PRODUCT_SERVER} from "../components/utils/misc";

export const getProductsBySell = () => {
    //articles?sortBy=sold&order=desc&limit=4
    const request = axios.get(PRODUCT_SERVER+'/articles?sortBy=sold&order=desc&limit=4')
        .then(res=>res.data);
    return {
        type: T.GET_PRODUCTS_BY_SELL,
        payload: request,
    }
};
export const getProductsByArrival = () => {
    //articles?sortBy=createdAt&order=desc&limit=4
    const request = axios.get(PRODUCT_SERVER+'/articles?sortBy=createdAt&order=desc&limit=4')
        .then(res=>res.data);
    return{
        type: T.GET_PRODUCTS_BY_ARRIVAL,
        payload: request,
    };
};

export const getProductsToShop=(skip, limit, filters=[], previousState=[])=>{
    //data object will be sent to the db:
    const data = {
        limit,
        skip,
        filters
    };

    const request = axios.post(PRODUCT_SERVER + '/shop', data)
        .then(res=>{
            let newState=[
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

///////////////////////////////
// Categories //
///////////////////////////////

export const getBrands =()=>{
    const request = axios.get(PRODUCT_SERVER + '/brands')
        .then(res=>res.data);
    return {
        type: T.GET_BRANDS,
        payload: request,
    }
};

export const getAttribute1 =()=>{
    const request = axios.get(PRODUCT_SERVER + '/attribute1')
        .then(res=>res.data);
    return {
        type: T.GET_ATTRIBUTE1,
        payload: request,
    }
};

export const getAttribute2 =()=>{
    const request = axios.get(PRODUCT_SERVER + '/attribute2')
        .then(res=>res.data);
    return {
        type: T.GET_ATTRIBUTE2,
        payload: request,
    }
};
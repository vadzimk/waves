import axios from 'axios';
import {T} from "./types";

import {USER_SERVER, PRODUCT_SERVER} from "../components/utils/misc";


export const registerUser = (dataToSubmit) => {
    const request = axios.post(USER_SERVER + '/register', dataToSubmit)
        .then(response => response.data);
    return {
        type: T.REGISTER_USER,
        payload: request,
    };
};

export const loginUser = (dataToSubmit) => {
    const request = axios.post(USER_SERVER + '/login', dataToSubmit)
        .then(response => response.data);
    return {
        type: T.LOGIN_USER,
        payload: request,
    };
};

export const authenticateUser = () => {
    const request = axios.get(USER_SERVER + '/auth')
        .then(res => res.data);
    return {
        type: T.AUTH_USER,
        payload: request,
    };
};

export const logOutUser = () => {
    const request = axios.get(USER_SERVER + '/logout').then(response => response.data);
    return {
        type: T.LOGOUT_USER,
        payload: request,
    };
};


//takes parameter id of a product
export const addToCart = (_id) => {

    const request = axios.post(USER_SERVER + '/addToCart?productId=' + _id)
        .then(res=>res.data);
    return {
        type:T.ADD_TO_CART_USER,
        payload: request,
    };
};

//fetches items to the UserCart component
//parameter cartItems is an array of cart items
//parameter userCart contains product ids and quantities in the cart
export const getCartItems=(cartItems, userCart)=>{
    const request = axios.get(PRODUCT_SERVER + '/articles_by_id?id=' + cartItems + '&type=array')
        .then(response=>{
            userCart.forEach(item=>{
                response.data.forEach((key,index)=>{
                    if(item.id===key._id){
                        response.data[index].quantity = item.quantity;
                    }
                })
            });
            return response.data;
        });
    return{
        type: T.GET_CART_ITEMS_USER,
        payload: request
    }
};


//takes the id of item to delete as a parameter
export const removeCartItem =(id)=>{
    const request = axios.get(USER_SERVER + '/removeFromCart?_id=' + id)
        .then(response=>{
            response.data.cart.forEach(item=>{
                response.data.cartDetail.forEach((key, iteration)=>{
                    if(item.id===key._id){
                        response.data.cartDetail[iteration].quantity = item.quantity;
                    }
                })
            });
            return response.data;
        });
    return {
        type: T.REMOVE_CART_ITEM_USER,
        payload:request
    }
};
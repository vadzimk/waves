import axios from 'axios';
import {T} from "./types";

import {USER_SERVER} from "../components/utils/misc";

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
    const request = axios.get(USER_SERVER +'/logout').then(response=>response.data);
    return {
        type: T.LOGOUT_USER,
        payload: request,
    };
};
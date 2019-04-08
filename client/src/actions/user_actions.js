import axios from 'axios';
import {T} from "./types";

import {USER_SERVER} from "../components/utils/misc";

export const registerUser =(dataToSubmit)=>{
    const request = axios.post(USER_SERVER +'/register', dataToSubmit)
        .then(response=>response.data);
    return {
        type: T.REGISTER_USER,
        payload: request,
    };
};

export const loginUser = (dataToSubmit) => {
    const request = axios.post(USER_SERVER + '/login', dataToSubmit)
        .then(response=>response.data);
    return{
        type: T.LOGIN_USER,
        payload: request,
    };
};
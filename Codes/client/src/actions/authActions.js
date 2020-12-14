import axios from 'axios';
import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, ITEMS_LOADED} from './types';
import {returnErrors} from './errorActions'
 

// ** User ** //
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    axios.get('/auth/user', tokenConfig(getState))
    .then(res=> dispatch({type: USER_LOADED, payload: res.data}))
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const register = (user) => dispatch =>{
    dispatch({type: USER_LOADING});
    return axios.post('/auth/register', user, {headers:{ 'Content-type':'application/json' }} )
    .then(res =>  {dispatch({type: REGISTER_SUCCESS, payload: res.data})})
    .catch(err => {dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')); dispatch({type: REGISTER_FAIL})})
}

export const logout = () =>{
    return {
        type: LOGOUT_SUCCESS
    }
}

export const login  = (user) => (dispatch) => {
    //User loading
    dispatch({type: USER_LOADING});
    //fetch user
    return axios
    .post('/auth', user, {headers:{ 'Content-type':'application/json' }} )
    .then(res=> {dispatch({type: LOGIN_SUCCESS, payload: res.data})})
};

export const getAdmins = () => () => {
    return axios.get('/auth/admins')
    .then(res=> {return res.data})
};


// ** Items ** //
export const getItems = () => (dispatch, getState) => {
    return axios.get('/items', tokenConfig(getState))
    .then(res=>  {dispatch({type: ITEMS_LOADED, payload: res.data})})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const getItemInfo = (id) => (dispatch, getState) => {
    return axios.get(`/admin/item/${id}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const addItem = (item) => (dispatch, getState) => {
    return axios.post('/admin/item', item, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const updateItem = (item) => (dispatch, getState) => {
    return axios.put('/admin/item', item, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const deleteItem = (id) => (dispatch, getState) => {
    return axios.delete(`/admin/item/${id}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};


// ** Sellers ** //
export const getSellers = () => (dispatch, getState) => {
    return axios.get('/admin/seller', tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const getSellerItems = (id) => (dispatch, getState) => {
    return axios.get(`/admin/seller-items/${id}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const updateSeller = (seller) => (dispatch, getState) => {
    return axios.put('/admin/seller', seller, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const addSeller = (seller) => (dispatch, getState) => {
    return axios.post('/admin/seller', seller, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const deleteSeller = (id) => (dispatch, getState) => {
    return axios.delete(`/admin/seller/${id}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};



// ** Orders ** //
export const getOrderInfo = (id) => (dispatch, getState) => {
    return axios.get(`/admin/orders/${id}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const updateOrder = (id, update) => (dispatch, getState) => {
    return axios.put(`/admin/orders/${id}`, update, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const updateOrderByItem = (update) => (dispatch, getState) => {
    return axios.post('/admin/orders', update, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};

export const getBucket = (admin) => (dispatch, getState) => {
    return axios.get(`/admin/orders/bucket/${admin}`, tokenConfig(getState))
    .then(res=> {return res.data})
    .catch(err =>{dispatch(returnErrors(err.response.data, err.response.status)); dispatch({type: AUTH_ERROR})})
};




//setup request headers
export const tokenConfig = getState =>{
    
    //get token from local storage
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const tokenFormDataConfig = getState =>{
    
    //get token from local storage
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}
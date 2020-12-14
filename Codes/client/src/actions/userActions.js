import axios from 'axios';

// ** Items ** //
export const showRoom = (id) => () => {
    return axios.get(`/items/${id}`)
    .then(res=> {return res.data})
};


// ** Cart ** //
export const addToCart = (item) => (getState) => {
    return axios.put('/users/cart', item, tokenConfig(getState))
    .then(res=> {return res.data})
};

export const clearCart = () => (getState) => {
    return axios.delete('/users/cart',tokenConfig(getState))
    .then(res=> {return res.data})
};

export const deleteItemCart = (id) => (getState) => {
    return axios.delete(`/users/cart/${id}`,tokenConfig(getState))
    .then(res=> {return res.data})
};

export const payCart = (payment) => (getState) => {
    return axios.post('/users/cart', payment, tokenConfig(getState))
    .then(res=> {return res.data})
};

export const buyNow = (payment) => (getState) => {
    return axios.post('/users/cart/buy-now', payment, tokenConfig(getState))
    .then(res=> {return res.data})
};


// ** Bills ** //
export const getBills = () => (getState) => {
    return axios.get('/users/bills', tokenConfig(getState))
    .then(res=> {return res.data})
};



// ** User Profile ** //
export const updateProfile = (update) => (getState) => {
    return axios.put('/users',update, tokenConfig(getState))
    .then(res=> {return res.data})
};

export const deleteProfile = () => (getState) => {
    return axios.delete('/users', tokenConfig(getState))
    .then(res=> {return res.data})
};





//setup request headers
export const tokenConfig = () =>{
    
    //get token from local storage
    const token = localStorage.getItem('token');
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
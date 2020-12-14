import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
    error: errorReducer,
    items: itemsReducer,
    auth: authReducer  
    //auth:authReducer
});
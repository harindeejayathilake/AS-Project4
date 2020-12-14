
import {ITEMS_LOADED} from '../actions/types';

const initialState = {
    items: [],
    isLoading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case ITEMS_LOADED:
            return{
                ...state,
                items: action.payload,
                isLoading: true
            };
        default:
            return state;
    }

}
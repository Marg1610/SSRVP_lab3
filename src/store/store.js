// src/store/store.js
import { createStore, combineReducers } from 'redux';

const authInitialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
};

function authReducer(state = authInitialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, user: null };
        default:
            return state;
    }
}

function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT': return { count: state.count + 1 };
        case 'DECREMENT': return { count: state.count - 1 };
        default: return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    counter: counterReducer
});

export const store = createStore(rootReducer);
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

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
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

function feedbackReducer(state = [], action) {
    switch (action.type) {
        case 'SET_FEEDBACK': return action.payload;
        case 'ADD_FEEDBACK': return [action.payload, ...state];
        case 'DELETE_FEEDBACK': return state.filter(item => item.id !== action.payload);
        default: return state;
    }
}

function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT': return { count: state.count + 1 };
        case 'DECREMENT': return { count: state.count - 1 };
        default: return state;
    }
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        feedback: feedbackReducer,
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
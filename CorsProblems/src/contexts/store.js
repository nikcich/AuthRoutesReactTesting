// store.js
import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './stateSlice';

const store = configureStore({
    reducer: {
        state: stateReducer,
    },
});

export default store;

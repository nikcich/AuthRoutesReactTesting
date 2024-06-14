// stateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stateA: 25,
    stateB: 26,
};

const stateSlice = createSlice({
    name: 'MyStateName',
    initialState,
    reducers: {
        setStateA: (state, action) => {
            state.stateA = action.payload;
        },
        setStateB: (state, action) => {
            state.stateB = action.payload;
        },
    },
});

export const { setStateA, setStateB } = stateSlice.actions;
export default stateSlice.reducer;

import './App.css'
import React, { useEffect, useMemo, useReducer } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './contexts/store';
import { setStateA, setStateB } from './contexts/stateSlice';

function App() {

  useEffect(() => {
    console.log("ROOT LEVEL");
  }, []);

  return (
    <Provider store={store}>
      <h1>HI</h1>
      <SubComponent />
      <OtherComponent />
    </Provider>
  );
}

function SubComponent() {

  const stateA = useSelector((state) => {
    return state.state.stateA;
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setStateA(Date.now()));
  }

  return (
    <div style={{ outline: '1px solid red' }}>
      <button onClick={handleClick}>Click me</button>
      {stateA}
    </div>
  );
}

// Wrap OtherComponent with React.memo to prevent it from re-rendering unnecessarily
const OtherComponent = () => {

  const stateB = useSelector((state) => {
    return state.state.stateB;
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setStateB(Date.now()));
  }

  return (
    <div style={{ outline: '1px solid red' }}>
      <button onClick={handleClick}>Click me</button>
      {stateB}
    </div>
  );
}

export default App;

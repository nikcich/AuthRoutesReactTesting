import { useState, useEffect } from 'react'
import './App.css'
import AuthWrapper from './AuthWrapper';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    if (data == null) {
      fetch('/abc/api/data').then((res) => {
        return res.json();
      }).then((res) => {
        setData(res);
      });
    }
  });

  return (
    <>
      <h1>Authenticated: {data?.message}</h1>
    </>
  )
}

export default App

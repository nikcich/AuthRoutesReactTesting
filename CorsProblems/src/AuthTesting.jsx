import { useState, useEffect } from 'react'
import AuthWrapper from './AuthWrapper';

function AuthTesting() {

    const [data, setData] = useState(null);

    useEffect(() => {
        if (data == null) {

            // Protected endpoint

            fetch('/abc/api/data', {
                method: 'GET',
                credentials: 'include' // Ensure cookies are included
            }).then((res) => {
                return res.json();
            }).then((res) => {
                setData(res);
            });
        }
    });

    return (
        <>
            <AuthWrapper>
                <h1>Authenticated: {data?.message}</h1>
            </AuthWrapper>
        </>
    )
}

export default AuthTesting;

/*
  Example custom fetch to have the credentials include on all fetches
*/

function customFetch(input, init = {}) {
    // Ensure init is an object and set the credentials option to 'include'
    const customInit = {
        ...init,
        credentials: 'include',
    };

    // Call the original fetch function with the modified init object
    return fetch(input, customInit);
}

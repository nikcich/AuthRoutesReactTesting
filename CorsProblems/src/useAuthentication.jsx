import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AUTH_ENUM from './AuthState';

const TOKEN_QUERY_KEY = 'authenticationToken';

const useAuthentication = (children) => {
    const [authState, setAuthState] = useState(AUTH_ENUM.LOADING);

    const fetchAuthToken = async () => {
        try {
            const response = await fetch('/abc/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are included
                body: JSON.stringify({
                    username: 'user',
                    password: 'password'
                })
            }); // Change this URL to your authentication endpoint
            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            const token = await response.json();

            if (token?.token) {
                setAuthState(AUTH_ENUM.AUTHENTICATED);
                return token?.token;
            } else {
                setAuthState(AUTH_ENUM.NOT_AUTHORIZED);
                throw error;
            }

        } catch (error) {
            setAuthState(AUTH_ENUM.NOT_AUTHORIZED);
            throw error;
        }
    };

    const { data: authToken, isLoading, isError } = useQuery({
        queryKey: [TOKEN_QUERY_KEY],
        queryFn: fetchAuthToken,
        retry: false,
        refetchInterval: authState == AUTH_ENUM.NOT_AUTHORIZED ? false : 10000, // Dont refetch if we get a not authenticatetd
    });

    // Function to fetch the authentication token from the API

    // Render content based on authentication state
    let content;
    if (isLoading) {
        content = <p>Attempting to log in...</p>;
    } else if (isError || authState === AUTH_ENUM.NOT_AUTHORIZED) {
        content = <p>Not authorized page</p>; // You can redirect here or display an error message
    } else {
        content = <>{children}</>;
    }

    return { content, authState };
};

export default useAuthentication;
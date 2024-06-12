import React from 'react';
import useAuthentication from './useAuthentication';
import AUTH_ENUM from './AuthState';

const AuthWrapper = ({ children }) => {
    const { content, authState } = useAuthentication(children);

    // if (authState === AUTH_ENUM.AUTHENTICATED) {
    //     return <>{children}</>
    // }

    // Render the children if authenticated
    return <>{content}</>;
};

export default AuthWrapper;

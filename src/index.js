import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authentication from 'react-azure-adb2c';

authentication.initialize({
    //instance: 'https://Customersmsreporting.b2clogin.com/',
    //instance: 'https://login.microsoftonline.com/tfp/',
    // your B2C tenant
    tenant: process.env.REACT_APP_AUTH_TENANT,
    // the policy to use to sign in, can also be a sign up or sign in policy
    signInPolicy: process.env.REACT_APP_AUTH_SIGNIN_POLICY,
    // the the B2C application you want to authenticate with
    applicationId: process.env.REACT_APP_AUTH_APPLICATION_ID,
    // where MSAL will store state - localStorage or sessionStorage
    cacheLocation: process.env.REACT_APP_AUTH_SESSION_STORAGE,
    // the scopes you want included in the access token
    scopes: [process.env.REACT_APP_AUTH_SCOPE_1],
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URL,
    // optional, the URI to redirect to after logout
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URL
});

authentication.run(() => {
    ReactDOM.render(<App />, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
});

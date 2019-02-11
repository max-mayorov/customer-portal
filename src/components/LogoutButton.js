import React from "react";
import authentication from 'react-azure-adb2c';

const LogoutButton = () =>
    <button onClick={() => { authentication.signOut(); }}>
        Logout
    </button>;

export default LogoutButton;
import React from 'react';
import Auth from '../../utils/auth';

function Nav() {

    function navigationCheck() {
        if (Auth.loggedIn()) {
            return (
                <div>
                    Logged In
                </div>
            );
        } else {
            return (
                <div>
                    Logged Out
                </div>
            );
        }
    };

    return (
        <div>
            {navigationCheck()}
        </div>
    );
};

export default Nav;
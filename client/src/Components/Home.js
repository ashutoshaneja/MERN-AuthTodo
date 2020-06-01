import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Home = props => {
    const authContext = useContext(AuthContext);

    return (
    <div>
        <h1>Welcome {authContext.user.username}!!</h1>
    </div>
        //<img href="https://ow2.res.office365.com/todo/244179_2.18.3/icons/welcome-center.png"/>
    )
}

export default Home;
import React, { useState, useContext } from 'react';
import Message from '../Components/Message';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username: "", pasword: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) =>{
        e.preventDefault();
        setUser({...user,[e.target.name] : e.target.value});
        console.log(user);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const{isAuthenticated, user, Message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('./todos');
            }
            else{
                setMessage(message);
            }
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>
                    Sign in Todoist
                </h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text"
                    name="username"
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter username.." />

                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password"
                    name="password"
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter password.." />  
                <button className="btn-lg btn-primary btn-block" type="submit">Log in</button>
            </form>
            {message? <Message message={message}/> : null}
        </div>
    )
}

export default Login;
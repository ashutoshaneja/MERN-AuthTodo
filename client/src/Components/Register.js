import React, { useState, useEffect, useRef } from 'react';
import Message from '../Components/Message';
import AuthService from '../Services/AuthService';

const Register = props => {
    const [user, setUser] = useState({ username: "", pasword: "", role:""});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    const resetForm = () => {
        setUser({ username: "", role: "" });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000);
            }
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>
                    Sign Up Todoist
                </h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text"
                    name="username"
                    onChange={onChange}
                    value={user.username}
                    className="form-control"
                    placeholder="Enter username.." />

                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password"
                    name="password"
                    onChange={onChange}
                    value={user.password}
                    className="form-control"
                    placeholder="Enter password.." />
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text"
                    name="role"
                    onChange={onChange}
                    value={user.role}
                    className="form-control"
                    placeholder="Enter Role (admin/user)" />        
                <button className="btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    )
}

export default Register;
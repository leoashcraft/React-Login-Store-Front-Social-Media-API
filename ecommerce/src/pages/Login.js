import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Login() {
    const history = useHistory();
    const { token, setToken } = useContext(UserContext);
    const {user, setUser } = useContext(UserContext);

    useEffect(() => {
        setToken(false)
    }, []);

    async function sendData(username, password) {
        return axios.post('https://fakestoreapi.com/auth/login', {
            username: username,
            password: password
        }).then(response => {
            return response.data.token
        }).catch(err => {
            console.log(err, err.response);
            setToken(false)
        })
    }


    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },

        onSubmit: values => {
            const username = values.username
            const password = values.password
            console.log("Here")
            const doSubmit = async () => {
                const newToken = await sendData(username, password);
                if (newToken) {
                    localStorage.setItem('token', newToken)
                    localStorage.setItem('user', username)
                    setToken(true)
                    setUser(username)
                }
                else {
                    setToken(false)
                }

            }
            
            doSubmit();
        }
    })
    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" onChange={formik.handleChange} value={formik.values.username} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password}  />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {token}
        </div>
    )
}


export default Login;


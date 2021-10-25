import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import Login from './Login';

function Register() {
    const history = useHistory();
    const { clicked, setClick } = useContext(UserContext);
    const {login, setLogin} = useContext(UserContext);

    // useEffect(() => {
    //     setClick(false)
    // }, []);

    async function sendData(username, password) {
        return axios.post('api/user', {
            username: username,
            password: password
        }).then(response => {
            return response.data
        }).catch(err => {
            console.log(err, err.response);
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
                const registerResponse = await sendData(username, password);
                if (registerResponse) {
                    setClick(true)
                    setLogin(true)
                }
            }
            
            doSubmit();
        }
    })
    return (

        <div className='container'>
            <h1>Register</h1>
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
            {/* <Link to="/login">Login</Link> */}
            <div>
            <Link to="/login" className="nav-link active" aria-current="page">
                <button onClick={() => setLogin(true)}>Login</button>
            </Link>
            </div>
        </div>
    )
}


export default Register;


import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useFormik } from 'formik';
function Deletepost(props) {
    const { id } = props.match.params
    const {tokenStr } = useContext(UserContext);
    const history = useHistory()
    const [load, setLoad] = useState(false)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            // 'mode': 'no-cors',
            'x-access-token' : tokenStr
        }
      };

      const deleteHandler = () => {
        axios.delete(`/api/post/${id}`,axiosConfig).then(response => {
            alert("Post deleted")
        }).catch(err => {
            console.log(err, err.response);
        })
        history.replace("/")
      }
        

    const formik = useFormik({
        initialValues : {
        },
        onSubmit: values => {
            const doSubmit = async () => {
                const response = await deleteHandler();
                history.replace("/")
            }
            doSubmit();
        }
    })


    return (
        <div className='container'>
            <p>Delete post?</p>
            <form onSubmit={formik.handleSubmit}>
            <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        </div>
    )
}

export default Deletepost

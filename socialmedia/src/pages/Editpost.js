import React, { useState, useEffect }from 'react'
import { useFormik } from "formik"
import axios from "axios";
import { useHistory } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../UserContext';


function Updateproduct(props) {
    const { id } = props.match.params
    const [isloading, setIsLoading] = useState(true);
    const [loadedPost, setLoadedPost] = useState({});
    const {tokenStr } = useContext(UserContext);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            // 'mode': 'no-cors',
            'x-access-token' : tokenStr
        }
      };

    const getPost = (num) => {
        axios.get(`/api/post/${num}`, axiosConfig).then((response) => {
            setIsLoading(false)
            setLoadedPost(response.data)
            console.log(response.data)
          });
    }


      async function sendData(text) {
        axios.put(`/api/post/${id}`, {
            text: text,
        }, axiosConfig).then(response => {
            alert("Post updated")
        }).catch(err => {
            console.log(err, err.response);
        })
    };
    

    const history = useHistory()

    const formik = useFormik({
        initialValues : {
            text : loadedPost.text ? loadedPost.text : '',
        },
        onSubmit: values => {
            const text = values.text
            
            const doSubmit = async () => {
                const response = await sendData(text);
                // props.load()
            }
            values.text = ""
            doSubmit();
            history.replace("/")
        },
        enableReinitialize : true
    })

    useEffect(() => {
        setIsLoading(true)
        getPost(id)
      }, []);

    if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
      
    return (
        <div className='container'>
            <p>New Post</p>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Post</label>
                <input type="text" className="form-control" id="text" aria-describedby="" required placeholder="Enter new post" onChange={formik.handleChange} value={formik.values.text} />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Updateproduct;

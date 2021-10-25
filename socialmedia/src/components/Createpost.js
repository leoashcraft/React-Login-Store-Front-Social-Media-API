import { useFormik } from "formik"
import axios from "axios";
import { useHistory } from "react-router";
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

function Createpost(props) {
    const {tokenStr } = useContext(UserContext);
    const {postadded, setPostAdded} = useContext(UserContext)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            // 'mode': 'no-cors',
            'x-access-token' : tokenStr
        }
      };

    async function sendData(text) {
        axios.post('/api/post', {
            text: text,
        }, axiosConfig).then(response => {
            alert("Post added")
        }).catch(err => {
            console.log(err, err.response);
        })
    };

    const history = useHistory()

    const formik = useFormik({
        initialValues : {
            text : ''
        },
        onSubmit: values => {
            const text = values.text
            
            const doSubmit = async () => {
                const response = await sendData(text);
                setPostAdded(true)
            }
            values.text = ""
            doSubmit();
            props.load()
        },
        enableReinitialize : true
    })
    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Post</label>
                <input type="text" className="form-control" id="text" aria-describedby="" required placeholder="Enter new post" onChange={formik.handleChange} value={formik.values.text} />
            </div>
           
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    )
}

export default Createpost

import React from "react"
import { useFormik } from "formik"
import axios from "axios";
import { useHistory } from "react-router";

function Createproduct() {

    async function sendData(title, price, description, image, category) {
        axios.post('https://fakestoreapi.com/products', {
            title: title,
            price: price,
            description: description,
            image: image,
            category: category
        }).then(response => {
            alert("Product added")
        }).catch(err => {
            console.log(err, err.response);
        })
    };

    const history = useHistory()

    const formik = useFormik({
        initialValues : {
            title: '',
            price: '',
            description: '',
            image: '',
            category: '',
        },
        onSubmit: values => {
            const title = values.title
            const price = values.price
            const description = values.description
            const image = values.image
            const category = values.category
            const doSubmit = async () => {
                const response = await sendData(title, price, description, image, category);
                history.replace("/")
            }
            doSubmit();
        }
    })
    return (
        <div className='container'>
            <p>Create product</p>
            <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="" required placeholder="Enter title" onChange={formik.handleChange} value={formik.values.title} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" aria-describedby="" required placeholder="Enter price" onChange={formik.handleChange} value={formik.values.price} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" aria-describedby="" required placeholder="Enter description" onChange={formik.handleChange} value={formik.values.description} />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="url" className="form-control" id="image" aria-describedby=""required  placeholder="Enter image url" onChange={formik.handleChange} value={formik.values.image} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" aria-describedby="" required placeholder="Enter category" onChange={formik.handleChange} value={formik.values.category} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Createproduct

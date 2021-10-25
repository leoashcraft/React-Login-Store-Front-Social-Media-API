import React, { useState, useEffect }from 'react'
import { useFormik } from "formik"
import axios from "axios";
import { useHistory } from "react-router";


function Updateproduct(props) {
    const { id } = props.match.params
    const [isloading, setIsLoading] = useState(true);
    const [loadedProduct, setLoadedProduct] = useState({});

    async function getProduct (num) {
        axios.get(`https://fakestoreapi.com/products/${num}`).then((response) => {
          const product = response.data
          setIsLoading(false)
          setLoadedProduct(product)
          console.log(loadedProduct)
          return product;  
        });
    }

    useEffect(() => {
        setIsLoading(true)
        // getProduct(id);
        axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
            const product = response.data
            // console.log(product)
            setIsLoading(false)
            setLoadedProduct(product)
          });
      }, []);

    async function sendData(title, price, description, image, category) {
        axios.put(`https://fakestoreapi.com/products/${id}`, {
            title: title,
            price: price,
            description: description,
            image: image,
            category: category
        }, {
                headers : {
                    'Content-Type' : 'application/json'
                }
        }
        ).then(response => {
            console.log(response)
            if (response.status == 200) {
                alert("Product has been updated")
            }
        }).catch(err => {
            console.log(err, err.response);
        })
    };
    

    const history = useHistory()

    const formik = useFormik({
        initialValues : {
            title: loadedProduct.title ? loadedProduct.title : '',
            price: loadedProduct.price ? loadedProduct.price : '',
            description: loadedProduct.description ? loadedProduct.description : '',
            image: loadedProduct.image ? loadedProduct.image : '',
            category: loadedProduct.category ? loadedProduct.category : '',
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
        },
        enableReinitialize:true
    })

    if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
      
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

export default Updateproduct;

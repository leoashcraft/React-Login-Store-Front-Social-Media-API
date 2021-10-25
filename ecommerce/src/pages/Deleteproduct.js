import React, { useState, useEffect }from 'react'
import { useFormik } from "formik"
import axios from "axios";
import { useHistory } from "react-router";


function Deleteproduct(props) {
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

    async function deleteData() {
        axios.delete(`https://fakestoreapi.com/products/${id}`,
        ).then(response => {
            console.log(response)
            if (response.status == 200) {
                alert("Product has been deleted")
            }
        }).catch(err => {
            console.log(err, err.response);
        })
    };
    

    const history = useHistory()

    const formik = useFormik({
        initialValues : {
        },
        onSubmit: values => {
            const doSubmit = async () => {
                const response = await deleteData();
                history.replace("/")
            }
            doSubmit();
        }
    })

    if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
      
    return (
        <div className='container'>
            <p>Delete <span className='fw-bold'>{loadedProduct.title}</span>?</p>
            <form onSubmit={formik.handleSubmit}>
            <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        </div>
    )
}

export default Deleteproduct;

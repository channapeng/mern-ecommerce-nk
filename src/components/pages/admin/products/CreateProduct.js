import React, { useState, useEffect } from 'react';
import MenubarAdmin from './../../../layouts/MenubarAdmin';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Spin } from "antd"
import { useNavigate } from 'react-router-dom';


// functions
import { createProduct } from '../../../functions/product'
import { listCategory } from "../../../functions/category"
import { Select } from 'antd';
import FileUpload from './FileUpload';



const initialstate = {
  title: "notebook",
  description: "test description",
  categories: [],
  category: "",
  price: "300",
  quantity: "15",
  images: []
}

const CreateProduct = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => ({ ...state }))

  const [ values, setValues ] = useState(initialstate)

  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    loadData(user.token)
  }, [])

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
         setValues({ ...values, categories: res.data })
      }).catch((err) => {
        console.log(err);
      })
  }

  // console.log(values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct(user.token, values)
      .then((res) => {
        // console.log(res)
        toast.success("Create Data  " + res.data.title + "  Success")
        window.location.reload()
        // navigate("/admin/home-admin")
      }).catch((err) => {
        console.log(err.response)
        toast.error("Create Data Error, Server Error !!")
      })
  }

  // console.log(values);

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">

          { loading
            ? <h1>Loading.... <Spin /> </h1>
            : <h1>Create Product Page</h1>
          }
          

          <form onSubmit={ handleSubmit }>

            <div className='form-group'>
              <label>title</label>
              <input 
                className='form-control'
                type="text"
                name="title"
                value={values.title}
                onChange={ handleChange }
              />
            </div>

            <div className='form-group'>
              <label>description</label>
              <input 
                className='form-control'
                type="text"
                name="description"
                value={values.description}
                onChange={ handleChange }
              />
            </div>

            <div className='form-group'>
              <label>price</label>
              <input 
                className='form-control'
                type="number"
                name="price"
                value={values.price}
                onChange={ handleChange }
              />
            </div>

            <div className='form-group'>
              <label>quantity</label>
              <input 
                className='form-control'
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={ handleChange }
              />
            </div>

            <div className='form-group'>
              <label>Category</label>
              <select 
                className='form-control'
                name="category"
                onChange={ handleChange }
              >
                <option>Please Select</option>
                {
                  values.categories.length > 0 &&
                  values.categories.map((item) => 
                    <option key={ item._id } value={ item._id}>{ item.name }</option> 
                  )
                }
              </select>
            </div>

            <FileUpload 
              loading = { loading }
              setLoading = { setLoading }
              values={ values }
              setValues={ setValues }
              />

            <button className="btn btn-primary">Submit</button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default CreateProduct;

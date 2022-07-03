import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin';

// redux
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

// functions
import { createCategory, listCategory, deleteCategory } from '../../../functions/category';

import { Link } from "react-router-dom"

const CreateCategory = () => {

  const { user } = useSelector((state) => ({ ...state }))

  // console.log(user.token);

  const [ values, setValues ] = useState({
    name: ""
  })
 

  const [ category, setCategory ] = useState([])
  useEffect( () => {
    loadData(user.token)
  }, [])
  const loadData = (authtoken) => {
    listCategory(authtoken)
     .then( (res) => {
      setCategory(res.data);
     }).catch( (err) => {
      console.log(err.response);
     })
  }

  

  // console.log(category);

  const handleChangeCategory = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createCategory(user.token, values)
      .then( (res) => {
        // console.log(res.data);
        loadData(user.token)
        toast.success("Insert Data ' " + res.data.name + " ' Success")
      }).catch( (err) => {
        console.log(err.response);
        toast.error("Insert Data Error !!")
      })
  }

  const handleDelete = (id) => {
    deleteCategory(user.token, id)
    .then((res) => {
      loadData(user.token)
      // console.log(res);
      toast.success("Delete Data ' " + res.data.name + " ' Success")
    }).catch((err) => {
      console.log(err.data)
      toast.error("Delete Data Error !!")
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>Create Category</h1>
          <form onSubmit={ handleSubmit }>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>
              <input type="text" className="form-control" name="name" onChange={ handleChangeCategory } />
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>
          <hr />

          <ul className="list-group">
            { category.map((item) => (
              <li className="list-group-item">
                { item.name }

                <span style={{ float: "right" }} className="badge bg-primary rounded-pill" 
                  onClick={ () => handleDelete(item._id)}>
                    X
                </span>

                <span style={{ float: "right" }} className="badge bg-primary rounded-pill">
                  <Link to={"/admin/update-category/"+ item._id}>Edit</Link>
                </span>


              </li>
            ))}
     
          </ul>
        </div>

      </div>
    </div>
  )
}

export default CreateCategory

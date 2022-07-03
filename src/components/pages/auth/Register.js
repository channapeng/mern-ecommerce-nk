import React, { useState } from 'react'

// functions
import { register } from '../../functions/auth'

// Toast
import { toast } from "react-toastify"

const Register = () => {

  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "" 
  })

  const handleChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.password !== value.password1) {
      toast.error("Password Not match")
    }else {
      register(value)
        .then(res => {
          // console.log(res)
          toast.success(res.data)
        }).catch(err => {
          // console.log(err.response)
          toast.error(err.response.data)
        })
    }
  }

  // console.log(value)

  return (
    <div className='container' p-5>
      <div className='row'>
        <h1>Register Page</h1>
        <form onSubmit={ handleSubmit }>
          <div className='form-group'>
            <label>UserName</label>
            <input className='form-control' type="text" name="username" onChange={ handleChange} />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input className='form-control' type="text" name="password" onChange={ handleChange} />
          </div>

          <div className='form-group'>
            <label>Confirm Password</label>
            <input className='form-control' type="text" name="password1" onChange={ handleChange} />
          </div>
          <br/>
          <button className='btn btn-success' disabled={ value.password.length < 6 }>Submit</button>
        </form>

      </div>
    </div>
  );
}

export default Register;

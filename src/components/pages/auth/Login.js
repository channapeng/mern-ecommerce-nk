import React, { useState } from 'react'

// functions
import { login } from '../../functions/auth'

// Redux
import { useDispatch } from 'react-redux'

import { useNavigate, useLocation } from 'react-router-dom'

// Toast
import { toast } from "react-toastify"
import {Spin } from "antd"

const Login = () => {

  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  // console.log("LOCATION :",location.state);

  const dispatch = useDispatch()

  const [value, setValue] = useState({
    username: "",
    password: "",
  })

  const roleBaseRedirect = (role) => {
    let intended =location.state
    if (intended){
      navigate("../" + intended)
    }else{
      if (role === "admin") {
        navigate("/admin/home-admin") 
      }else {
        navigate("/user/home-user")
      }
    }
  }
  
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    login(value)
     .then(res => {
        // console.log(res.data)
        setLoading(false)
        toast(res.data.payload.user.username + " Login success")

        dispatch({ 
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role
          }
        })
        
        localStorage.setItem("token", res.data.token)
        roleBaseRedirect(res.data.payload.user.role)

     }).catch(err => {
        // console.log(err.response)
        setLoading(false)
        toast.error(err.response.data)
     })
  }
 
  return (
    <div className='container' p-5>
      <div className='row'>
        { loading 
            ? <h1>Loading ...<Spin /></h1>
            : <h1>Login page</h1>
        }
        <form onSubmit={ handleSubmit }>
        <div className='form-group'>        
          <label>UserName</label>
          <input className='form-control' type="text" name="username" onChange={ handleChange} />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className='form-control' type="text" name="password" onChange={ handleChange} />
        </div>
        <br/>
        <button className='btn btn-success' disabled={ value.password.length < 6 }>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default Login

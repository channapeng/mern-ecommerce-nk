import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// functions
import { getUserCart, saveAddress, saveOrder, emptyCart } from "../functions/users"

// quill
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

const CheckOut = () => {

  const navigate = useNavigate()

  const { user } = useSelector((state)=>({ ...state }))

  const dispatch = useDispatch()

  const [ products, setProducts ] = useState([])
  const [ total, setTotal ] = useState(0)

  const [ address, setAddress ] = useState("")
  const [ addressSaved, setAddressSaved ] = useState(false)
  
  useEffect(()=>{
    getUserCart(user.token)
      .then(res=>{
        console.log(res.data)
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
      })
  }, [])

  const handleSaveAddress = ()=>{
    // console.log(address);
    saveAddress(user.token, address)
      .then(res=>{
        // console.log(res.data);
        if (res.data.ok) {
          toast.success("Address Saved")
          setAddressSaved(true)
        }
      })
  }

  const handleCreateOrder = ()=>{
    saveOrder(user.token)
      .then(res=>{
        console.log(res.data)
        // clear Db
        emptyCart(user.token)
        // clear store
        dispatch({
          type: "ADD_TO_CART",
          payload: []
        })
        // clear localstorage
        if (typeof window !== "undefined"){
          localStorage.removeItem("cart")
        }

        toast.success("Save Order Success")  
        navigate("/user/history")   
      })
      
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
    
        <div className='col-md-6'>
          <h4>Address</h4>
          <br />
          text area
          <ReactQuill value= { address } onChange={ setAddress } />

          <button 
            className='btn btn-primary m-2'
          onClick={ handleSaveAddress }>Save Address</button>
        </div>
    
        <div className='col-md-6'>
          <h4>Order Summary</h4>
          <hr />
          <p>Product <b>{ products.length }</b></p>
          <hr />
          <p>List of product</p>
            { products.map((item, i)=>
              <div key={ i } >
                <p>
                  { item.product.title } x { item.count } = { item.price * item.count }
                </p>
              </div>
            )}
            <hr />
            Total: <b>{total}</b>

            <br />
            <button 
              onClick={ handleCreateOrder }
              disabled= { !addressSaved || !products.length }
              className='btn btn-primary mt-3'>
              Check Outr
            </button>
        </div>
    
      </div>
    </div>
  )
}

export default CheckOut
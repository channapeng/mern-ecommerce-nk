import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const ProductTableInCart = ({ item }) => {

  const dispatch = useDispatch()

  const handleChangeCount = (e)=>{
    // console.log(e.target.value)
    const count = e.target.value < 1 ? 1 : e.target.value
    if (count > item.quantity){
      toast.error("Max avialable Quantify : " + item.quantity)
      return
    }


    let cart = []
    if (localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    // console.log(cart)
    cart.map((product, index)=>{
      if (product._id === item._id){
        cart[index].count = count
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    dispatch({
      type: "ADD_TO_CART",
      payload: cart
    })
  }

  const handleDelete = ()=>{
    
    let cart = []
    if (localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    // console.log(cart)
    cart.map((product, index)=>{
      if (product._id === item._id){
        cart.splice(index,1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    dispatch({
      type: "ADD_TO_CART",
      payload: cart
    })

  }

  return (
    <>
      <tbody>
        <tr>
          <td><img src={ item.images[0].url } width="100" /></td>
          <td>{ item.title }</td>
          <td>{ item.price }</td>
          <td>
            <input 
              onChange={ handleChangeCount }
              className="form-control"
              value={ item.count }
              type="number"
            />
          </td>
          <td><DeleteOutlined 
                className='text-danger'
                onClick={ handleDelete }
              />
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default ProductTableInCart;

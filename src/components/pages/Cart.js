import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import ProductTableInCart from '../card/ProductTableInCart';
import { useNavigate } from 'react-router-dom';

import { userCart } from '../functions/users';

import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart, user } = useSelector((state)=>({ ...state }))
  const getTotal = ()=>{
    return cart.reduce(( currenValue, nextValue )=>{
      return currenValue + nextValue.count * nextValue.price
    }, 0)
  }

  // getTotal()
  const handleSaveOrder = ()=>{
    alert("CheckOut Order")
    userCart(user.token, cart)
      .then(res=>{
        // console.log(res)
        navigate("/checkout")
      }).catch(err=>{
        console.log(err);
      })
  }

  const showCartItem = ()=>
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <td>Images</td>
          <td>Title</td>
          <td>Price</td>
          <td>Count</td>
          <td>Remove</td>
        </tr>
      </thead>
      { cart.map((item)=>
          <ProductTableInCart key={ item._id } item={ item } />
        )
      }

    </table>

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Card Page */}
        {/* { JSON.stringify(cart)} */}
        
        <div className='col-md-8'>
          <h4>Cart / { cart.length }  product</h4>
          { !cart.length
            ? <p>No Product in Cart</p>
            : showCartItem()
          }


        </div>

        <div className='col-md-4'>
          <h4>Summary</h4>
          <hr />
          {
            cart.map((item, index)=>
              <p key={ index }>
                { item.title } x { item.count } = { item.price * item.count }
              </p>
            )
          }
          <hr />
          Total : <b> { getTotal() } </b>
          <hr />
           { user
              ? <button className='btn btn-success'
                  onClick={ handleSaveOrder }
                  disabled={ !cart.length }
                >Check Out</button>
              : <button className='btn btn-danger'>
                  <Link to = "/login"
                    state = "cart"
                  >
                    Login to CheckOut
                  </Link>
                
                </button>
           
           }

        </div>

      </div>
    </div>
  );
}

export default Cart;

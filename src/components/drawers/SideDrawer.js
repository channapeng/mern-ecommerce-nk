import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Drawer, button } from "antd"

const SideDrawer = () => {

  const dispatch = useDispatch()
  const { cart, drawer } = useSelector((state)=>({ ...state }))

  const onCloseDrawer = ()=>{
    dispatch({
      type: "SET_VISIBLE",
      payload: false
    })
  }

  return (
    <>
      <Drawer 
        title={ "Cart "+ cart.length + " product" } 
        placement='right' 
        visible={ drawer } 
        onClose={ onCloseDrawer }
        >
        { cart.map((item)=>(
          <div className='row'>
            <div className='col'>
              <img 
                src={ item.images[0].url }
                style={{ width: "100%", height: "50px", objectFit: "cover" }} 
              
              />
              <p className='text-center bg-secondary text-light'>
                { item.title } x { item.count }
              </p>
            </div>
          </div>
        ))}
        <Link to ="/cart">
          <button 
            className='text-center btn btn-primary'
            onClick={ onCloseDrawer }
            >
            Go to cart ...
          </button>
        </Link>
        {/* { JSON.stringify(cart)} */}
      </Drawer> 
    </>
  )
}

export default SideDrawer


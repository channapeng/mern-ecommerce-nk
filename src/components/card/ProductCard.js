import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()


  // console.log(product)
  const { _id, title, description, images } = product

  const handleAddToCart = ()=>{
    // console.log("Click Add");
    let cart = []
    if (localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    console.log(cart);
    cart.push({
      ...product,
      count: 1
    })
    let unique = _.uniqWith(cart, _.isEqual)

    localStorage.setItem("cart", JSON.stringify(unique))

    dispatch({
      type: "ADD_TO_CART",
      payload: unique
    })

    dispatch({
      type: "SET_VISIBLE",
      payload: true
    })
    
  }

  return (
    <Card
      hoverable
      // style={{ width: 240 }}
      cover={<img
        className='p-1' 
        style={{ height: "150px", objectFit: "cover" }}
        alt="example" 
        src={ images && images.length
              ? images[0].url
              : ""
            } 
        />}
        actions={[
          <Link to={ "/product/"+_id }>
            <EyeOutlined className='text-warning' />
          </Link>
          ,

          <ShoppingCartOutlined 
            onClick={ handleAddToCart }
            className='text-danger' 
          />
        ]}
    >
      <Meta title={ title } description={ description } />
    </Card>
  );
}

export default ProductCard;

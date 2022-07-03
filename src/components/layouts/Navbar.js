import React from 'react';

import { Menu, Badge } from 'antd';

import { HomeOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined, DownOutlined,ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import Search from '../card/Search';




const Navbar = () => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, cart } = useSelector((state) => ({ ...state }))
  // console.log(user)
  const { SubMenu } = Menu

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    navigate("/")
  }

  return ( 

    <Menu mode="horizontal" >

      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={ cart.length } offset={[ 9,0 ]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>

      { user && (
        <>
         
          <SubMenu style={{ float: "right" }} key="SubMenu" icon={<DownOutlined />} title={user.username} >
            
            { user.role == "admin"
              ? <Menu.Item key="setting:2">
                  <Link to="/admin/home-admin">
                    Dashboard
                  </Link>
                </Menu.Item>
              : <Menu.Item key="setting:2">
                  <Link to="/user/home-user">
                    Dashboard
                  </Link>
                </Menu.Item>
            }
            <Menu.Item
              icon={<LogoutOutlined />}
              key="setting:1"
              onClick={ logout } 
            >
              Logout
            </Menu.Item>
          </SubMenu>


        </>
      )}

      { !user && (
        <>
          <Menu.Item key="login" icon={<LoginOutlined />} style={{ float: "right"}}>
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item key="register" icon={<UserAddOutlined />} style={{ float: "right"}}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          
        </>
      )}

      <span className="p-1" style={{ float: "right" }}>
        <Search />
      </span>
    </Menu>
  );
}

export default Navbar;

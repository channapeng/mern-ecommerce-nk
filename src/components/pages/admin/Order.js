import React, { useState, useEffect }  from 'react';
import MenubarAdmin from './../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux';
// notify
import { toast } from "react-toastify"
// functions
// import { getOrder } from "../../functions/users"

import { updateStatusOrder, getOrderAdmin } from "../../functions/admin"

// antd
import { Tabs, Table } from "antd"

const Order = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ orders, setOrders ] = useState([]) 
  const { TabPane } = Tabs

  useEffect(()=>{
    loadData()
  }, [])

  const loadData = () =>{
    getOrderAdmin(user.token)
      .then(res=>{
        setOrders(res.data)
      }).catch(err=>{
        console.log(err)
      })
  }
  // console.log(orders);
  const handleChangeStatus = (orderId, orderstatus)=>{
    updateStatusOrder(user.token, orderId, orderstatus)
      .then(res=>{
        // console.log(res.data)
        toast.info("Updated "+ res.data.orderstatus + " Success")
        loadData()
      }).catch(err=>{
        console.log(err)
      })
  }
  // console.log(orders);

  const orderCard =  orders.map((item,index)=>{
    // console.log("item :",item);
    return <div className="card m-3" key={ index }>
      <p>Order by <b>{ item.orderdBy.username }</b>
        <br />
        { "  " + item.orderstatus }</p>

      <select 
        value={ item.orderstatus }
        onChange={ (e)=>handleChangeStatus(item._id, e.target.value) }
        style={{ width: "200px", alignSelf: "center" }}
        className="form form-control">
        <option value="Not Process">Not Process</option>
        <option value="Processing">Processing</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Completed">Completed</option>
      </select>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
          </tr>
        </thead>
        { item.products.map((p,i)=>
          <tr>
            <td>{p.product.title}</td>
            <td>{p.price}</td>
            <td>{p.count}</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>ราคาสุทธิ : <b><u>{item.cartTotal}</u></b></td>
        </tr>

      </table>
    </div>
  })

  const columns = [
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "orderdBy",
      render:(item, index)=><>
        { item.username }
      </>
    },
    {
      title: "รายการสินค้า",
      render: (item, index)=><ol>
        { item.products.map((p,i)=>
          <li>{ p.product.title }{" "}<b>{ p.price } x { p.count }</b> </li>
        ) }
      </ol>
    },
    {
      title: "ราคารวมสุทธิ",
      dataIndex: "cartTotal",
      key: "cartTotal"
    },
    {
      title: "สถานะ",
      dataIndex: "orderstatus",
      key: "orderstatus"
    },
    {
      title: "อัพเดทสถานะ",
      render: (item)=> <select 
        value={ item.orderstatus }
        onChange={ (e)=>handleChangeStatus(item._id, e.target.value) }
        style={{ width: "200px", alignSelf: "center" }}
        className="form form-control">
        <option value="Not Process">Not Process</option>
        <option value="Processing">Processing</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Completed">Completed</option>
      </select>
    }
  ]

  const tableBoot = 
  
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">ที่</th>
        <th scope="col">ชื่อผู้ใช้</th>
        <th scope="col">รายการสินค้า</th>
        <th scope="col">ราคารวมสุทธิ</th>
        <th scope="col">สถานะ</th>
        <th scope="col">อัพเดทสถานะ</th>
      </tr>
    </thead>
    <tbody>
      { orders.map((item, index)=>
        <tr>
          <th scope="row">{ index+1 }</th>
          <td>{ item.orderdBy.username }</td>
          <td>{ item.products.map((p)=>
              <li>{ p.product.title} {""}(<b>{ p.price } x { p.count }</b>)</li>
            )}
          </td>
          <td>{ item.cartTotal }</td>
          <td>{ item.orderstatus }</td>
          <td>
            <select 
              value={ item.orderstatus }
              onChange={ (e)=>handleChangeStatus(item._id, e.target.value) }
              style={{ width: "200px", alignSelf: "center" }}
              className="form form-control">
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </td>
        </tr>
      )}

    </tbody>

  </table>

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col text-center" >

          <Tabs defaultActiveKey="1">

            <TabPane tab="Tab 1" key="1">
              Order Card
              { orderCard }
            </TabPane>

            <TabPane tab="Tab 2" key="2">
              Table Antd
              <Table dataSource= { orders } columns= { columns } />

            </TabPane>

            <TabPane tab="Tab 3" key="3">
              Table Boostrap
              { tableBoot }         
            </TabPane>

          </Tabs>
    

        </div>

      </div>
    </div>
  );
}

export default Order;

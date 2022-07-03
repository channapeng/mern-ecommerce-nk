import React, { useState, useEffect } from 'react';
import MenubarUser from './../../layouts/MenubarUser';
import { useSelector } from 'react-redux';
import { getOrder } from './../../functions/users';
import InvoiceJsPDF from '../../orders/InvoiceJsPDF';

const History = () => {

  const { user } = useSelector((state)=>({ ...state }))
  const [ orders, setOrders ] = useState([])
  
  useEffect(()=>{
    loadData() 
  }, [])

  const loadData = ()=>{
    getOrder(user.token)
      .then(res=>setOrders(res.data))
      .catch(err=>{
        console.log(err);
      })
  }
// console.log(orders);
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row">
            <h1> History page</h1>
            {orders.map((item,index)=>{
              console.log("item :",item);
              return <div className="card m-3" key={ index }>
                <p>Order { "  " + item.orderstatus }</p>
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
                      
                <div className="row">
                  <div className="col">
                    <InvoiceJsPDF order={ item } />
                  </div>
                </div>
                


              </div>
            }
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default History;

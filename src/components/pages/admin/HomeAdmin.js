import React, { useState, useEffect }  from 'react';
import MenubarAdmin from './../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux';

// functions
import { listProduct, deleteProduct } from '../../functions/product';
// import { listProduct, deleteProduct } from '../../functions/product';
import AdminProductCard from '../../card/AdminProductCard';

// notify
import { toast } from "react-toastify"

const HomeAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ product, setProduct ] = useState([])
  const [ loading, setLoading ] = useState([false])

  useEffect(()=>{
    loadData(100)
  },[])

  const loadData = (count)=>{
    setLoading(true)
    listProduct(count)
      .then(res=>{
        setLoading(false)
        setProduct(res.data)
      }).catch(err=>{
        setLoading(false)
        console.log(err)
      })
  }

  const handleDelete = (id)=>{
    // console.log(id)
    if(window.confirm("Delete ?")){
      // console.log(user.token, id);
      deleteProduct(user.token, id)
        .then(res=>{
          toast.success("Deleted "+ res.data.title+ " Success")
          loadData(100)
          // console.log(res)
        }).catch(err=>{
          toast.error("Remove Error")
          console.log(err)
        })
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {
            loading
            ? <h1>Loading...</h1>
            : <h1>HomeAdmin Page</h1>
          }
          {/* { JSON.stringify(product)} */}

          <div className='row'>
            {
              product.map((item)=>(
                <div key={ item._id } className='col-md-4 pb-3'>
                  <AdminProductCard
                    handleDelete={ handleDelete }
                    product={ item }
                  />
                </div>
              ))
            }

          </div>
          

        </div>

      </div>
    </div>
  );
}

export default HomeAdmin;

import React, { useState, useEffect } from 'react'
import ProductCard from '../card/ProductCard'

// functions
import { listProductBy } from "../functions/product"

import LoadingCard from '../card/LoadingCard'

const NewProduct = () => {

  const [ loading, setLoading ] = useState(false)
  const [ products, setProducts ] = useState([])

  useEffect(()=>{
    loadData()
  }, [])

  const loadData = ()=>{
    setLoading(true)
    listProductBy("createdAt", "desc", 3)
      .then(res=>{
        setLoading(false)
        setProducts(res.data)
      }).catch(err=>{
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <>
      <div className="container">

        {
          loading
          ? <LoadingCard count={ 3 }/>
          : <div className="row">
              {
                products.map((item, index)=>
                  <div key={ index } className='col-md-4'>
                    <ProductCard product={ item } />
                  </div>
                )
              }
            </div>
        }
        

      </div>
    </>
  )
}

export default NewProduct
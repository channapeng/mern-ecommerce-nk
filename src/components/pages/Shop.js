import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from "../card/ProductCard"
// functions
import { listProduct, searchFilters } from '../functions/product';
import { listCategory } from '../functions/category'

// antd
import { Slider, Checkbox } from "antd"

const Shop = () => {

  const [ product, setProduct ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ price, setPrice ] = useState([0,0])
  const [ ok, setOk ] = useState(false)

  // Category
  const [ catetory, setCategory ] = useState([])
  const [ categorySelect, setCategorySelect ] = useState([])

  const { search } = useSelector((state)=>({ ...state }))
  const { text } = search
  // console.log("Search =>: ", text);

  useEffect(()=>{
    loadData()
    listCategory()
      .then(res=>{
        setCategory(res.data)
      }).catch(err=>{
        console.log(err)
      })
  }, [])
  // console.log(catetory);

  const loadData = ()=>{
    setLoading(true)
    listProduct(5)
      .then(res=>{
        setLoading(false)
        setProduct(res.data)
      }).catch(err=>{
        setLoading(false)
        console.log(err)
      })
  }


  // Load DAata when User filter
  // filter
  useEffect(()=>{
    const delay = setTimeout(()=>{
      if (!text){
        loadData()
      }
      fetchDataFilter({
        query: text
      }, 300)
      return ()=> clearTimeout(delay)
    })
  }, [text])

  const fetchDataFilter = (arg)=>{
    searchFilters(arg)
      .then(res=>{
        setProduct(res.data)
      }).catch(err=>{
        console.log(err);
      })
  }

  useEffect(()=>{
    fetchDataFilter({ price })
  }, [ok])

  const handlePrice = (value)=>{
    setPrice(value);
    setTimeout(()=>{
      setOk(!ok)
    }, 300)
  }

  const handleCheck = (e)=>{
    // console.log(e.target.value);
    let inCheck = e.target.value
    let inState = [ ...categorySelect ]

    let findCheck = inState.indexOf(inCheck)

    if (findCheck === -1){
      inState.push(inCheck)
    }else{
      inState.splice(findCheck, 1)
    }
    setCategorySelect(inState)
    fetchDataFilter({ category: inState })
    if (inState.length < 1 ){
      loadData()
    }

  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3">
            Filter / Search
            <hr />
            <h4>ค้นหาราคาสินค้า</h4>
            <Slider 
              onChange={ handlePrice }
              range max={ 100000} 
              value={ price }
            />
            <hr />

            <h4>ค้นหาหมวดหมู่สินค้า</h4>
            {
              catetory.map((item, index)=>
              <Checkbox
                onChange={ handleCheck }
                 value={item._id}
              >
                { item.name }
              </Checkbox>
              )
            }

          </div>

          <div className="col-md-9">
            { loading 
              ? <h4 className="text-danger">Loading ....</h4>
              : <h4 className="text-info">Product</h4>
            }  

            { product.length < 1 && <p>No Product found</p> }

            <div className='row pb-5'>
              { product.map((item, index) =>
                <div key={ index } className="col-md-4 mt-3">
                  <ProductCard product={ item } />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      Shop
    </>
  );
}

export default Shop;

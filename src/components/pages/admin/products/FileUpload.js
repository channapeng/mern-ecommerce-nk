import React from 'react';
import Resizer from "react-image-file-resizer"
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, loading, setLoading }) => {

  const { user } = useSelector(( state ) => ({ ...state }))
  // console.log(user)
  // console.log("values in filesUpload",values);

  const handleChangeFile = (e) => {
    // console.log(e.target.files)
    const files = e.target.files
    if (files) {
      setLoading(true)

      let allfileUpload = values.images

      // console.log(files)
      for(let i=0; i<files.length; i++) {
        // console.log(files[i]);
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios.post(
              process.env.REACT_APP_API+"/images",
              {
               image: uri,  
              },
              {
               headers: {
                authtoken: user.token,
              },
            }
            )
            // console.log(uri)
            .then( (res) => {
              // console.log(res);
              setLoading(false)
              allfileUpload.push(res.data)
              // console.log("all fUpload", allfileUpload);
              setValues({ ...values, images: allfileUpload })
            }).catch((err) => {
              setLoading(false)
              console.log(err);
            })
            
          },
          "base64"
        )
        
      }
    }

  }

  const handleDelete = (public_id) => {
    setLoading(true)
    console.log(public_id);
    // const img = values.images
    const { images } = values
    axios.post(process.env.REACT_APP_API+"/removeimages", 
    {
      public_id
    },
    { 
      headers: {
        authtoken: user.token
      }
    }
    ).then((res) => {
      setLoading(false)
      let filterImages = images.filter(item => {
        return item.public_id !== public_id
      })
      setValues({ ...values, images: filterImages })
    }).catch((err) => {
      setLoading(false)
      console.log(err);
    })
  }

  return (
    <>
      <br />
      { values.images && values.images.map(item => 
          <span className='"avatar-item'>
            <Badge
              onClick={ () => handleDelete(item.public_id) }
              style={{ cursor: 'pointer' }}
              count="x">
              <Avatar src={ item.url } shape="square" size={ 120 } />
            </Badge>
          </span>
        )}
      
      <hr />
      <div className='form-group'>
        <label className='btn btn-primary'>Choose File...
          <input 
            className='form-control'
            type="file"
            hidden
            multiple
            accept='images/*'
            name="file"
            onChange={ handleChangeFile }

          />
        </label>
      </div>
      <br />
    </>
  );
}

export default FileUpload;

import React,{ useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';

import { useSelector } from 'react-redux';

// functions
import { listUser, changeStatus, changeRole, deleteUser, resetPassword } from '../../functions/users';

// antd
import { Switch, Select, Tag, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
// moment
// import moment from 'moment';
import moment from 'moment/min/moment-with-locales';

const ManageAdmin = () => {

  const { user } = useSelector((state) => ({ ...state }))


  // Data in Table 
  const [ dataList, setDataList ] = useState([])
  // Data Select
  const [ selectData, setSelectData ] = useState([])
  // Data in Loop
  const [ drop, setDrop ] = useState([])


  const [isModalVisible, setIsModalVisible] = useState(false)
  const [values, setValues] = useState({
    id: "",
    password: ""
  })


  const showModal = (id) => {
    setIsModalVisible(true)
    setValues({ ...values, id: id});
  }

  const handleChangePassword = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleOk = () => {
    setIsModalVisible(false)
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        loadData(user.token)
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
      })
  }
  
  const handleCancel = () => {
    setIsModalVisible(false)
  }



  
  useEffect( () => {
    loadData(user.token)
  }, [user.token])
  
  const loadData = (authtoken) => {
    // 
    listUser(authtoken)
      .then( (res) => {
        setDataList(res.data);
        setSelectData(res.data)
        //  [...new Set(array) ]
        const dataDrop = [...new Set(res.data.map(item=>item.role)) ] 
        // console.log("dataDrop ",dataDrop);
        setDrop(dataDrop)

      }).catch((err) => {
        console.log(err.response.data);
      })
  }

  const handleOnChange = (e, id) => {
    const value = {
      id: id,
      enabled: e
    }
  changeStatus(user.token, value)
      .then((res) => {
        // console.log(res);
        loadData(user.token)
      }).catch((err) => {
        console.log(err.response);
      })
  }

  const roleData = [ "admin", "user" ]

  const  handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e
    }
  changeRole(user.token, values)
      .then( (res) => {
        // console.log(res);
        loadData(user.token)
      }).catch( (err) => {
        console.log(err.response);
      })
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure Delete")) {
      deleteUser(user.token, id)
      .then( (res) => {
        // console.log(res);
        loadData(user.token)
      }).catch( (err) => {
        console.log(err.response);
      })


    }
  }

  const handleSelectRole = (e)=>{
    console.log(e.target.value);
    const value = e.target.value
    if (value == "all") {
      setSelectData(dataList)
    }else {
      // 
      const filterData = dataList.filter((item, index)=>{
        return item.role == value
      })
      setSelectData(filterData);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>ManageAdmin Page</h1>
          {/* <select onChange={ (e)=>handleSelectRole(e) }>
            <option value="all">all</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select> */}

          <select onChange={ (e)=>handleSelectRole(e) }>
            <option value="all">all</option>
            { drop.map((item, index)=>
              <option key={ index } value={ item } >{ item }</option>
            )}
          </select>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">UserName</th>
                <th scope="col">Role</th>
                <th scope="col">status</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              { selectData.map((item, index) => (
              // { dataList.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.username}</th>

                  <td>
                    <Select style={{ width: "100%" }} 
                      value = { item.role } 
                      onChange = { (e) => handleChangeRole(e,item._id) }
                    >
                      { roleData.map((item, index) => (
                          <Select.Option value= { item } key={ index }>
                            { item == "admin" 
                              ? <Tag color="green">{ item }</Tag>
                              : <Tag color="red" >{ item }</Tag>
                            }
                            </Select.Option>
                      ))}
                    </Select>
                  </td>
                  
                  <td>
                    <Switch checked={item.enabled} onChange={(e) => handleOnChange(e, item._id)} />
                  </td>
                  
                  <td>
                  { moment(item.createdAt).locale("th").format("ll") }
                  </td>

                  <td>
                    { moment(item.updatedAt).locale("th").startOf(item.updatedAt).fromNow() }
                  </td>
                  <td><DeleteOutlined onClick={ () => handleDelete(item._id) }/> </td>
                  <EditOutlined onClick={ () => showModal(item._id) }/>
                </tr>
              ))}
           
            </tbody>
          </table>
          
          <Modal
            title="Edit Password"
            visible={ isModalVisible }
            onOk={ handleOk }
            onCancel={ handleCancel }
          >
            <p>New Password</p>
            <input type="text"
              name="password"
              onChange={ handleChangePassword }
            />

          </Modal>

        </div>

      </div>
    </div>
  );
}

export default ManageAdmin;

import axios from "axios"

export const listUser = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/users",
    {
      headers: {
        authtoken
      }
    }
  )

export const changeStatus = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-status", value,
    {
      headers: {
        authtoken
      }
    }
  )

export const changeRole = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/change-role", value,                   
    {
      headers: {
        authtoken
      }
    }
  )

  export const deleteUser = async (authtoken, id) =>
  await axios.delete(process.env.REACT_APP_API + "/users/" + id,
    {
      headers: {
        authtoken
      }
    }
  )

  export const resetPassword = async (authtoken, id, values) =>
  await axios.put(process.env.REACT_APP_API + "/users/" + id, values,
    {
      headers: {
        authtoken
      }
    }
  )

export const userCart = async (authtoken, cart) =>
  await axios.post(process.env.REACT_APP_API + "/user/cart", { cart },                   
    {
      headers: {
        authtoken
      }
    }
  )

export const getUserCart = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/cart",                   
    {
      headers: {
        authtoken
      }
    }
  )

export const emptyCart = async (authtoken) =>
  await axios.delete(process.env.REACT_APP_API + "/user/cart",
    {
      headers: {
        authtoken
      }
    }
  )

export const saveAddress = async (authtoken, address) =>
  await axios.post(process.env.REACT_APP_API + "/user/address", { address },                   
    {
      headers: {
        authtoken
      }
    }
  )

export const saveOrder = async (authtoken) =>
  await axios.post(process.env.REACT_APP_API + "/user/order",{},                   
    {
      headers: {
        authtoken
      }
    }
  )

export const getOrder = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/order",                   
    {
      headers: {
        authtoken
      }
    }
  )

// wishlist
export const getWishList = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/user/wishlist",                   
    {
      headers: {
        authtoken
      }
    }
  )

export const addToWishList = async (authtoken, productId) =>
  await axios.post(process.env.REACT_APP_API + "/user/wishlist", { productId},                   
    {
      headers: {
        authtoken
      }
    }
  )

export const removeWishList = async (authtoken, productId) =>
  await axios.put(process.env.REACT_APP_API + "/user/wishlist/" + productId,
   {},                   
    {
      headers: {
        authtoken
      }
    }
  )
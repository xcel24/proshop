import axios from 'axios'
import { ADD_ITEM_TO_CART } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    //Get the item which the user wants by the id
    const { data } = await axios.get(`/api/products/${id}`)

    //add the qty to the object and dispatch it to reducer
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {}
}

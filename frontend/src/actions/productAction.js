import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_INITIATE,
  PRODUCT_LIST_REQUEST_SUCCESS,
  PRODUCT_REQUEST_FAIL,
  PRODUCT_REQUEST_INITIATE,
  PRODUCT_REQUEST_SUCCESS,
} from '../constants/productConstants'

export const fetchAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST_INITIATE })

    const { data } = await axios.get('/api/products')

    dispatch({ type: PRODUCT_LIST_REQUEST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST_INITIATE })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: PRODUCT_REQUEST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

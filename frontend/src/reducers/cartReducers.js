import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      //check whether the item already exist or not
      const item = action.payload

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === existItem.productId ? item : cartItem
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      }
    default:
      return state
  }
}

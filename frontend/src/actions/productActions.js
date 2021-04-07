import Axios from "axios";

import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

// All products
export const listProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get('/api/products');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message
    });
  }
}

// Product Details 
export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId
  });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS, payload: data
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: message
    });
  }
}
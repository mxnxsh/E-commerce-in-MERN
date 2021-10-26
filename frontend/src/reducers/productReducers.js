import { PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_RESET, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = { loading: true, products: [] }, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
export const productCategoryListReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: payload }
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
export const productDetailsReducer = (state = { loading: true, product: {} }, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
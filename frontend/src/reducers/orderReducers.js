import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}
export const orderDetailsReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
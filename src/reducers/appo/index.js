import {
    GET_LIST_APPO,
    TAMBAH_APPO,
    GET_DETAIL_APPO,
    UPDATE_APPO,
    DELETE_APPO,
  } from "actions/AppoAction";
  
  const initialState = {
    getListAppoLoading: false,
    getListAppoResult: false,
    getListAppoError: false,
  
    tambahAppoLoading: false,
    tambahAppoResult: false,
    tambahAppoError: false,
  
    getDetailAppoLoading: false,
    getDetailAppoResult: false,
    getDetailAppoError: false,
  
    updateAppoLoading: false,
    updateAppoResult: false,
    updateAppoError: false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_LIST_APPO:
        return {
          ...state,
          getListAppoLoading: action.payload.loading,
          getListAppoResult: action.payload.data,
          getListAppoError: action.payload.errorMessage,
        };
  
      case TAMBAH_APPO:
        return {
          ...state,
          tambahAppoLoading: action.payload.loading,
          tambahAppoResult: action.payload.data,
          tambahAppoError: action.payload.errorMessage,
        };
  
      case GET_DETAIL_APPO:
        return {
          ...state,
          getDetailAppoLoading: action.payload.loading,
          getDetailAppoResult: action.payload.data,
          getDetailAppoError: action.payload.errorMessage,
        };
  
      case UPDATE_APPO:
        return {
          ...state,
          updateAppoLoading: action.payload.loading,
          updateAppoResult: action.payload.data,
          updateAppoError: action.payload.errorMessage,
        };
  
      case DELETE_APPO:
        return {
          ...state,
          deleteAppoLoading: action.payload.loading,
          deleteAppoResult: action.payload.data,
          deleteAppoError: action.payload.errorMessage,
        };
  
      default:
        return state;
    }
  }
  
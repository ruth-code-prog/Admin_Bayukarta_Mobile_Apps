import { GET_LIST_USER, TAMBAH_USER, GET_DETAIL_USER, UPDATE_USER, DELETE_USER } from "actions/UserAction";

const initialState = {
    getListUserLoading: false,
    getListUserResult: false,
    getListUserError: false,

    tambahUserLoading: false,
  tambahUserResult: false,
  tambahUserError: false,

    getDetailUserLoading: false,
    getDetailUserResult: false,
    getDetailUserError: false,
  
    updateUserLoading: false,
    updateUserResult: false,
    updateUserError: false,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_LIST_USER:
      return {
        ...state,
        getListUserLoading: action.payload.loading,
        getListUserResult: action.payload.data,
        getListUserError: action.payload.errorMessage,
      };

      case TAMBAH_USER:
      return {
        ...state,
        tambahUserLoading: action.payload.loading,
        tambahUserResult: action.payload.data,
        tambahUserError: action.payload.errorMessage,
      };

      case GET_DETAIL_USER:
      return {
        ...state,
        getDetailUserLoading: action.payload.loading,
        getDetailUserResult: action.payload.data,
        getDetailUserError: action.payload.errorMessage,
      };

      case UPDATE_USER:
      return {
        ...state,
        updateUserLoading: action.payload.loading,
        updateUserResult: action.payload.data,
        updateUserError: action.payload.errorMessage,
      };

      case DELETE_USER:
        return {
          ...state,
          deleteUserLoading: action.payload.loading,
          deleteUserResult: action.payload.data,
          deleteUserError: action.payload.errorMessage,
        };
        
        default:
            return state
    }
}
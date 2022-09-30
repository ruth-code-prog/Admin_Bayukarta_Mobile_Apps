import {
  GET_LIST_ASSMIT,
  TAMBAH_ASSMIT,
  GET_DETAIL_ASSMIT,
  UPDATE_ASSMIT,
  DELETE_ASSMIT,
  UPDATE_UNREAD_ASSMIT,
} from 'actions/AssmitAction'

const initialState = {
  getListAssmitLoading: false,
  getListAssmitResult: false,
  getListAssmitError: false,
  unreadListAssmit: 0,

  tambahAssmitLoading: false,
  tambahAssmitResult: false,
  tambahAssmitError: false,

  getDetailAssmitLoading: false,
  getDetailAssmitResult: false,
  getDetailAssmitError: false,

  updateAssmitLoading: false,
  updateAssmitResult: false,
  updateAssmitError: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ASSMIT:
      return {
        ...state,
        getListAssmitLoading: action.payload.loading,
        getListAssmitResult: action.payload.data,
        getListAssmitError: action.payload.errorMessage,
      }

    case TAMBAH_ASSMIT:
      return {
        ...state,
        tambahAssmitLoading: action.payload.loading,
        tambahAssmitResult: action.payload.data,
        tambahAssmitError: action.payload.errorMessage,
      }

    case GET_DETAIL_ASSMIT:
      return {
        ...state,
        getDetailAssmitLoading: action.payload.loading,
        getDetailAssmitResult: action.payload.data,
        getDetailAssmitError: action.payload.errorMessage,
      }

    case UPDATE_ASSMIT:
      return {
        ...state,
        updateAssmitLoading: action.payload.loading,
        updateAssmitResult: action.payload.data,
        updateAssmitError: action.payload.errorMessage,
      }

    case DELETE_ASSMIT:
      return {
        ...state,
        deleteAssmitLoading: action.payload.loading,
        deleteAssmitResult: action.payload.data,
        deleteAssmitError: action.payload.errorMessage,
      }

    case UPDATE_UNREAD_ASSMIT:
      return {
        ...state,
        unreadListAssmit: action.payload,
      }

    default:
      return state
  }
}


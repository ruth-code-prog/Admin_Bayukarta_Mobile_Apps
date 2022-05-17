import {
  GET_LIST_PASIEN,
  TAMBAH_PASIEN,
  GET_DETAIL_PASIEN,
  UPDATE_PASIEN,
  DELETE_PASIEN,
} from "actions/PasienAction";

const initialState = {
  getListPasienLoading: false,
  getListPasienResult: false,
  getListPasienError: false,

  tambahPasienLoading: false,
  tambahPasienResult: false,
  tambahPasienError: false,

  getDetailPasienLoading: false,
  getDetailPasienResult: false,
  getDetailPasienError: false,

  updatePasienLoading: false,
  updatePasienResult: false,
  updatePasienError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PASIEN:
      return {
        ...state,
        getListPasienLoading: action.payload.loading,
        getListPasienResult: action.payload.data,
        getListPasienError: action.payload.errorMessage,
      };

    case TAMBAH_PASIEN:
      return {
        ...state,
        tambahPasienLoading: action.payload.loading,
        tambahPasienResult: action.payload.data,
        tambahPasienError: action.payload.errorMessage,
      };

    case GET_DETAIL_PASIEN:
      return {
        ...state,
        getDetailPasienLoading: action.payload.loading,
        getDetailPasienResult: action.payload.data,
        getDetailPasienError: action.payload.errorMessage,
      };

    case UPDATE_PASIEN:
      return {
        ...state,
        updatePasienLoading: action.payload.loading,
        updatePasienResult: action.payload.data,
        updatePasienError: action.payload.errorMessage,
      };

    case DELETE_PASIEN:
      return {
        ...state,
        deletePasienLoading: action.payload.loading,
        deletePasienResult: action.payload.data,
        deletePasienError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}

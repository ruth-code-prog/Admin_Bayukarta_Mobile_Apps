import { GET_LIST_JADWAL, TAMBAH_JADWAL, GET_DETAIL_JADWAL, UPDATE_JADWAL, DELETE_JADWAL} from "actions/JadwalAction";

const initialState = {
  getListJadwalLoading: false,
  getListJadwalResult: false,
  getListJadwalError: false,

  tambahJadwalLoading: false,
  tambahJadwalResult: false,
  tambahJadwalError: false,

  getDetailJadwalLoading: false,
  getDetailJadwalResult: false,
  getDetailJadwalError: false,

  updateJadwalLoading: false,
  updateJadwalResult: false,
  updateJadwalError: false,

  deleteJadwalLoading: false,
  deleteJadwalResult: false,
  deleteJadwalError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_JADWAL:
      return {
        ...state,
        getListJadwalLoading: action.payload.loading,
        getListJadwalResult: action.payload.data,
        getListJadwalError: action.payload.errorMessage,
      };

    case TAMBAH_JADWAL:
      return {
        ...state,
        tambahJadwalLoading: action.payload.loading,
        tambahJadwalResult: action.payload.data,
        tambahJadwalError: action.payload.errorMessage,
      };

      case GET_DETAIL_JADWAL:
      return {
        ...state,
        getDetailJadwalLoading: action.payload.loading,
        getDetailJadwalResult: action.payload.data,
        getDetailJadwalError: action.payload.errorMessage,
      };

      case UPDATE_JADWAL:
      return {
        ...state,
        updateJadwalLoading: action.payload.loading,
        updateJadwalResult: action.payload.data,
        updateJadwalError: action.payload.errorMessage,
      };

      case DELETE_JADWAL:
      return {
        ...state,
        deleteJadwalLoading: action.payload.loading,
        deleteJadwalResult: action.payload.data,
        deleteJadwalError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}

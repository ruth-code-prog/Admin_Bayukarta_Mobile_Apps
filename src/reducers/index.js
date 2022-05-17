import { combineReducers } from "redux";
import JadwalReducer from './jadwal';
import UserReducer from './user';
import PasienReducer from './pasien';
import AppoReducer from './appo';
import AuthReducer from './auth'

export default combineReducers({JadwalReducer, UserReducer, PasienReducer,  AppoReducer, AuthReducer})
import { combineReducers } from "redux";
import JadwalReducer from './jadwal';
import AssmitReducer from './assmit';
import UserReducer from './user';
import AppoReducer from './appo';
import AuthReducer from './auth'

export default combineReducers({JadwalReducer, AssmitReducer, UserReducer,  AppoReducer, AuthReducer})
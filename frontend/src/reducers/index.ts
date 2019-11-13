import {combineReducers} from "redux"
import {timeReducer} from "./timer";
import {currentPage} from "./currentPage";
import {auth} from "./auth";


export default combineReducers({
    timer: timeReducer,
    currentPage,
    auth
})
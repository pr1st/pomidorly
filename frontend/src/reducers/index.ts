import {combineReducers} from "redux"
import {timeReducer} from "./timer";
import {currentPage} from "./currentPage";
import {auth} from "./auth";
import {fetching} from "./fetch";


export default combineReducers({
    timer: timeReducer,
    currentPage,
    auth,
    fetching
})
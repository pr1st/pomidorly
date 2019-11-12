import {combineReducers} from "redux"
import {timeReducer} from "./timer";
import {currentPage} from "./currentPage";


export default combineReducers({
    timer: timeReducer,
    currentPage
})
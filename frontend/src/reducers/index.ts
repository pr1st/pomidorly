import {combineReducers} from "redux"
import {timeReducer} from "./timer";
import {currentPage} from "./currentPage";
import {auth} from "./auth";
import {fetching} from "./fetch";
import {currentTasks} from "./currentTasks";


export default combineReducers({
    timer: timeReducer,
    currentPage,
    auth,
    fetching,
    currentTasks
})
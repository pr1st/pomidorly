import {combineReducers} from "redux"
import {timeReducer} from "./timer";

export default combineReducers({
        timer: timeReducer
    }
)
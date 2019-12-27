import { combineReducers } from 'redux'
import departures from './departures'
import stop from './stop'
import modes from "./modes";

export default combineReducers({
    departures,
    stop,
    modes
})
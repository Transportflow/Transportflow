import { combineReducers } from 'redux';
import suggestions from "./suggestions";
import departures from './departures';
import stop from './stop';
import modes from "./modes";

export default combineReducers({
    suggestions,
    departures,
    stop,
    modes
})
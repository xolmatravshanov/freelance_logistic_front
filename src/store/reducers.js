import {combineReducers} from "redux";
import dynaReducer from "./dyna/reducers";
import mainReducer from "./main/reducers";

export default combineReducers({
    main: mainReducer,
    dyna: dynaReducer,
})
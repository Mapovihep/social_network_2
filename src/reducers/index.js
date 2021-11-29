import { combineReducers } from "redux";
import { sagaReducer } from "./sagaReducer";

const rootReducer = combineReducers({
    saga: sagaReducer,
  })

export default rootReducer;

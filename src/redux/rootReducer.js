import { combineReducers } from "redux";
import { tableReducer } from "../features/tableSlice";

export const rootReducer = combineReducers({
    products: tableReducer
})
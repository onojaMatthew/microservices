import { combineReducers } from "redux";
import account from "./reducers_signup";
import upload from "./reducers_uploads";

const rootReducers = combineReducers({
  account,
  upload,
});

export default rootReducers;

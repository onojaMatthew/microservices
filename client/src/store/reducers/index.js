import { combineReducers } from "redux";
import account from "./reducers_signup";
import upload from "./reducers_uploads";
import polls from "./reducers_poll";

const rootReducers = combineReducers({
  account,
  upload,
  polls,
});

export default rootReducers;

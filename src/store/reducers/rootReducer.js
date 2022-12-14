import { combineReducers } from "redux";
import authReducer from "./authReducer";
import patientReducer from "./patientReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: patientReducer
});

export default rootReducer;

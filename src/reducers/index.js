import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
  form: form
});

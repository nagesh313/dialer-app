import { combineReducers } from "redux";
import login from "./login";
import snackbar from "./snackbar";
import theme from "./theme";
export default combineReducers({ login, snackbar, theme });

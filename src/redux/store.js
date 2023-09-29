import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

// Create the Redux store with the reducer and apply middleware (thunk in this case)
const store = createStore(reducer, applyMiddleware(thunk));

export default store;


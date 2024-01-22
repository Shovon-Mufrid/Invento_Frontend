import storage from "./storage";

import { createStore, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "ERP",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

let persistor = persistStore(store);
console.log(store);
export { store, persistor };

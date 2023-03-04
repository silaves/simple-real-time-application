import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/userInfoSlice";
import getClientReducer from "./reducers/clientSlice";
import alertReducer from "./reducers/alertSlice";

export const store = configureStore({
  reducer: {
    userInfoReducer: authReducer,
    clientReducer: getClientReducer,
    alertReducer: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

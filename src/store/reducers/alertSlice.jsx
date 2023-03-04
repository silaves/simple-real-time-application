import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: "OOPS!",
  msg: "Ocurrio un problema con la solicitud.",
  variant: "primary"
}

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.msg = action.payload.msg;
      state.variant = action.payload.variant;
    },
    hideAlert: (state, action) => {
      state.show = false;
    },
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
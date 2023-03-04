import { createSlice } from '@reduxjs/toolkit';
import { userRegister } from '../actions/userRegister';
import { userLogin } from '../actions/userLogin';

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  errorPayload: null,
  error: false,
  errorLogin: false,
  success: false,
}

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.error = false
    },
    [userRegister.rejected]: (state, {payload}) => {
      state.loading = false
      state.errorPayload = payload
      state.error = true
      state.success = false
    },
    [userLogin.pending]: (state, { payload }) => {
      state.loading = true
      state.errorLogin = false
      state.success = false
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.errorLogin = true
      state.success = false
    },
  },
})
export default userInfoSlice.reducer
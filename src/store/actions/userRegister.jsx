import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import config from "../../config/config";

export const userRegister = createAsyncThunk(
  'userRegister',
  async ({ email, password, name, lastname }, { rejectWithValue }) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${config.apiHost}${config.apiAuthRegister}`,
        { email, password, name, lastname },
        options
      );
      localStorage.setItem(config.nameUserToken, data.token);
    } catch (error) {

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)
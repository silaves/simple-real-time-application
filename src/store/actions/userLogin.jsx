import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const userLogin = createAsyncThunk(
  'userLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${config.apiHost}${config.apiAuthLogin}`,
        { email, password },
        options
      );
      localStorage.setItem(config.nameUserToken, data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
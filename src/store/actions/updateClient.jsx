import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const updateClient = createAsyncThunk(
  'updateClient',
  async ({id, info}, { rejectWithValue }) => {
    const token = localStorage.getItem(config.nameUserToken);
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }

      const { data } = await axios.patch(
        `${config.apiHost}${config.apiClient}/${id}`,
        info,
        options
      );

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
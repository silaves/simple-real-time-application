import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
import {removeEmptyFields} from "../../utils/object";

export const newClient = createAsyncThunk(
  'newClient',
  async ({body}, { rejectWithValue }) => {
    const token = localStorage.getItem(config.nameUserToken);

    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
      body = removeEmptyFields(body)
      const { data } = await axios.post(
        `${config.apiHost}${config.apiClient}`,
        body,
        options
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
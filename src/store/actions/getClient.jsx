import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const getClient = createAsyncThunk(
  'getClient',
  async ({}, { rejectWithValue }) => {
    const token = localStorage.getItem(config.nameUserToken);
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        `${config.apiHost}${config.apiClient}`,
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

export const getClientById = createAsyncThunk(
  'getClientById',
  async ({id}, { rejectWithValue }) => {
    const token = localStorage.getItem(config.nameUserToken);
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        `${config.apiHost}${config.apiClient}/${id}`,
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
import { createSlice } from '@reduxjs/toolkit';
import {getClient, getClientById} from '../actions/getClient';
import { deleteClient } from '../actions/deleteClient';
import { updateClient } from '../actions/updateClient';
import {newClient} from "../actions/newClient";

const initialState = {
  getClientLoading: false,
  clients: [],
  filteredClients: [],
  getClientError: false,
  getClientSuccess: false,

  getClientIdLoading: false,
  getClientIdError: false,
  client: {},
  getClientIdSuccess: false,

  deleteClientLoading: false,
  deleteClientError: false,
  deleteClientErrorData: {},
  deleteClientSuccess: false,

  updateClientLoading: false,
  updateClientError: false,
  updateClientErrorData: {},
  updateClientSuccess: false,

  newClientLoading: false,
  newClientError: false,
  newClientErrorData: {},
  newClientSuccess: false,

  showClientModal: false,
  showNewClientModal: false,
  // editItem: {},
}

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    searchByName: (state, action) => {
      if (action.payload === "" || action.payload === null || action.payload === undefined) {
        return {
          ...state,
          filteredClients: state.clients
        }
      }
      const filteredClients = state.clients.filter((client) =>
        client.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredClients:
          action.payload.length > 0 ? filteredClients : [...state.clients]
      };
    },
    showClientModal: (state, action) => {
      switch (action.payload) {
        case "edit":
          return {...state, showClientModal: true}
        case "new":
          return {...state, showNewClientModal: true}
      }
    },
    hideClientModal: (state, action) => {
      return {...state, showClientModal: false, showNewClientModal: false}
    }
  },
  extraReducers: {
    // getClient
    [getClient.pending]: (state) => {
      state.getClientLoading = true
      state.getClientError = false
      state.getClientSuccess = false
    },
    [getClient.fulfilled]: (state, { payload }) => {
      state.getClientLoading = false
      state.getClientSuccess = true
      state.getClientError = false
      state.clients = payload
      state.filteredClients = payload
    },
    [getClient.rejected]: (state, {payload}) => {
      state.getClientLoading = false
      state.getClientError = true
      state.getClientSuccess = false
    },
    // getClientById
    [getClientById.pending]: (state) => {
      state.getClientIdLoading = true
      state.getClientIdError = false
      state.getClientIdSuccess = false
    },
    [getClientById.fulfilled]: (state, { payload }) => {
      state.getClientIdLoading = false
      state.getClientIdSuccess = true
      state.getClientIdError = false
      state.client = payload
    },
    [getClientById.rejected]: (state, {payload}) => {
      state.getClientIdLoading = false
      state.getClientIdError = true
      state.getClientIdSuccess = false
    },
    // deleteClient
    [deleteClient.pending]: (state) => {
      state.deleteClientLoading = true
      state.deleteClientError = false
      state.deleteClientSuccess = false
    },
    [deleteClient.fulfilled]: (state, { payload }) => {
      state.deleteClientLoading = false
      state.deleteClientSuccess = true
      state.deleteClientError = false

    },
    [deleteClient.rejected]: (state, {payload}) => {
      state.deleteClientLoading = false
      state.deleteClientError = true
      state.deleteClientErrorData = payload
      state.deleteClientSuccess = false
    },
    // updateClient
    [updateClient.pending]: (state) => {
      state.updateClientLoading = true
      state.updateClientError = false
      state.updateClientSuccess = false
    },
    [updateClient.fulfilled]: (state, { payload }) => {
      state.updateClientLoading = false
      state.updateClientSuccess = true
      state.updateClientError = false
    },
    [updateClient.rejected]: (state, {payload}) => {
      state.updateClientLoading = false
      state.updateClientError = true
      state.updateClientErrorData = payload
      state.updateClientSuccess = false
    },
    // newClient
    [newClient.pending]: (state) => {
      state.newClientLoading = true
      state.newClientError = false
      state.newClientSuccess = false
    },
    [newClient.fulfilled]: (state, { payload }) => {
      state.newClientLoading = false
      state.newClientSuccess = true
      state.newClientError = false
    },
    [newClient.rejected]: (state, {payload}) => {
      state.newClientLoading = false
      state.newClientError = true
      state.newClientErrorData = payload
      state.newClientSuccess = false
    },
  },
})

export const { searchByName, showClientModal, hideClientModal } = clientSlice.actions;
export default clientSlice.reducer
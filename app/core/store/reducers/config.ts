import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit'

import { request } from '../../../utils/request';
import { RootState } from '../../interfaces/store';

export type ConfigState = {
  configs: {
    facebook: {
      clientId: number | null;
      redirectUri: string;
    };
  };
}

const initialState = {
  configs: {
    facebook: {
      clientId: null,
      redirectUri: '',
    }
  }
} as ConfigState;

export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async () => {
    const response = await request.get('identity/configs');
    return response.data;
  }
);

export const selectConfigs = (state: RootState) => state.config.configs;

const configReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchConfig.fulfilled, (state, action) => {
      state.configs = action.payload;
    })
})

export default configReducer;

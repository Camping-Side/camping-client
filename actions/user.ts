import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { backendUrl } from '../config/config';

axios.defaults.baseURL = backendUrl;
// @ts-ignore
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/v1/auth/login', data);
    console.log('response: ', response)
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
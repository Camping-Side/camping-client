import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:9060/api/v1/auth/login', data);
    console.log('response: ', response)
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});


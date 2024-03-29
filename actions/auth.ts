import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";
import { JoinReqData, LoginReqData } from "../type/auth/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const reissueToken = createAsyncThunk(
  "auth/reissueToken",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(BASE_URL + "/api/v1/auth/reissue", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginReqData, { rejectWithValue }) => {
    try {
      const response = await api.post(BASE_URL + "/api/v1/auth/login", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const join = createAsyncThunk(
  "auth/join",
  async (data: JoinReqData, { rejectWithValue }) => {
    console.log("data: ", data);
    try {
      const response = await api.post(BASE_URL + "/api/v1/auth/sign", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

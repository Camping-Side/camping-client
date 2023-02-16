import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../util/api";
import { CommunityReqData } from "../type/community/community";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getList = createAsyncThunk(
  "community/getList",
  async (data: CommunityReqData, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/community", {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetail = createAsyncThunk(
  "community/getDetail",
  async (data: string | string[] | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get(BASE_URL + "/api/v1/community/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailComment = createAsyncThunk(
  "community/getDetailComment",
  async (data: string | string[] | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get(
        BASE_URL + "/api/v1/community/comment/" + data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update = createAsyncThunk(
  "community/update",
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await api.put(BASE_URL + "/api/v1/community/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove = createAsyncThunk(
  "community/remove",
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(BASE_URL + "/api/v1/community/" + data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeComment = createAsyncThunk(
  "community/removeComment",
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        BASE_URL + "/api/v1/community/comment/" + data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

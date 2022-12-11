import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const checkEmailDup = createAsyncThunk(
    "account/checkEmailDup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                DOMAIN + "/api/v1/accounts/checkEmailDup",
                data
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkPhoneDup = createAsyncThunk(
  "account/checkPhoneDup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        DOMAIN + "/api/v1/accounts/checkPhoneDup",
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

import { createSlice } from '@reduxjs/toolkit';
import {
    login,
} from '../actions/user';

// 기본 state
export const initialState = {
    loginInfo: null,
    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state){
            state.loginDone = false;
            state.loginInfo = null;
        }
    },
    extraReducers: (builder) => builder
        // 로그인
        .addCase(login.pending, (state) => {
            console.log('state: ', state)
            state.loginLoading = true;
            state.loginDone = false;
            state.loginError = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.loginInfo = action.payload.resultData;
            state.loginDone = true;
        })
        .addCase(login.rejected, (state: any, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
        })
});

export default userSlice;

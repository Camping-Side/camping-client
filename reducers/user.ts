import { createSlice } from '@reduxjs/toolkit';
import {
    login,
} from '../actions/user';

// 기본 state
export const initialState = {
    me: null, // 내 정보
    userInfo: null, // 유저 정보
    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => builder
        // login
        .addCase(login.pending, (state) => {
            console.log('state: ', state)
            state.loginLoading = true;
            state.loginDone = false;
            state.loginError = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.me = action.payload;
            state.loginDone = true;
        })
        .addCase(login.rejected, (state: any, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
        })
});

export default userSlice;

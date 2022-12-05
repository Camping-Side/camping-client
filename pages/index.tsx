import React from "react";
import { FC } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";
import userSlice from "../reducers/user";
import {useDispatch, useSelector} from "react-redux";
import BaseButton from "@cp/common/BaseButton";

const App: FC = () => {

    const dispatch = useDispatch();

    const {loginDone} = useSelector((state:any) => state.user)

    const logoutAction = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(userSlice.actions.logout())
    }

    return (
        <Layout>
            <Link href="/sample">샘플바로가기</Link><br/>
            { !loginDone && <Link href="/user/login">로그인 바로가기</Link>}
            {  loginDone && <BaseButton variant="contained" size="large" onClick={logoutAction}>로그아웃</BaseButton>}
        </Layout>
    )
}

export default App;
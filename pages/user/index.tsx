import React from "react";
import { FC } from "react";

import Layout from "@layout/Layout";
import Link from "next/link";

const User: FC = () => {
    return (
        <Layout>
            <Link href="/sample">샘플바로가기</Link>
            <Link href="/user/login">로그인 바로가기</Link>
        </Layout>
    )
}

export default User;
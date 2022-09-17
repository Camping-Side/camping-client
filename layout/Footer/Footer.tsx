import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Link from "next/link";
import styles from "@cmStyles/module/footer.module.scss";

export default function BottomAppBar() {
    return (
        <div className={styles.footerBar + " layoutWidth"}>
            <Toolbar
                sx={{ justifyContent: "space-between" }}
            >
                <Link href={'/'}>
                    <IconButton color="inherit">
                        홈
                    </IconButton>
                </Link>
                <Link href={'/shop'}>
                    <IconButton color="inherit">
                        상점
                    </IconButton>
                </Link>
                <Link href={'/info'}>
                    <IconButton color="inherit">
                        캠핑인포
                    </IconButton>
                </Link>
                <Link href={'/community'}>
                    <IconButton color="inherit">
                        커뮤니티
                    </IconButton>
                </Link>
                <Link href={'/mypage'}>
                    <IconButton color="inherit">
                        마이페이지
                    </IconButton>
                </Link>
            </Toolbar>
        </div>
    );
}

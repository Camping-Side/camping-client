import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import styles from "@cmStyles/module/footer.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import SmsIcon from "@mui/icons-material/Sms";
import PersonIcon from "@mui/icons-material/Person";

import Typography from "@mui/material/Typography";

export default function BottomAppBar() {
  return (
    <div className={styles.footerBar + " layoutWidth"}>
      <Toolbar
        sx={{ justifyContent: "space-between", marginRight: 3, marginLeft: 3 }}
      >
        <Link href={"/"}>
          <div>
            <HomeIcon sx={{ color: "#5bbd6b" }} />
            <br />
            <Typography sx={{ color: "#5bbd6b" }}>홈</Typography>
          </div>
        </Link>
        <Link href={"/shop"}>
          <div>
            <ShoppingCartIcon sx={{ color: "#A7A7A7" }} />
            <br />
            <Typography sx={{ color: "#7A7A7A" }}>상점</Typography>
          </div>
        </Link>
        <Link href={"/info"}>
          <div>
            <EditIcon sx={{ color: "#A7A7A7" }} />
            <br />
            <Typography sx={{ color: "#7A7A7A" }}>캠핑인포</Typography>
          </div>
        </Link>
        <Link href={"/community"}>
          <div>
            <SmsIcon sx={{ color: "#A7A7A7" }} />
            <br />
            <Typography sx={{ color: "#7A7A7A" }}>커뮤니티</Typography>
          </div>
        </Link>
        <Link href={"/mypage"}>
          <div>
            <PersonIcon sx={{ color: "#A7A7A7" }} />
            <br />
            <Typography sx={{ color: "#7A7A7A" }}>마이</Typography>
          </div>
        </Link>
      </Toolbar>
    </div>
  );
}

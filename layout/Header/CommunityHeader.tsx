import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomLink from "@cp/common/CustomLink";
import { Category } from "../../type/product/product";
import { useDispatch, useSelector } from "react-redux";
import { Feed } from "../../type/community/community";
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Divider } from "@mui/material";
import { AppDispatch } from "../../store/configureStore";
import { remove } from "../../actions/community";

const HeaderBox = styled(Box)`
  background: white;
  width: 100%;
  svg {
    font-size: 30px;
  }
  a {
    cursor: pointer;
  }
  p {
    margin-left: 30px;
    font-size: 22px;
    font-weight: 700;
  }
  .div-home-icon {
    line-height: 23px;
    float: right;
  }
  .MuiIconButton-root {
    padding: 0px;
  }
`;

export default function DrawerAppBar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn: Boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const loginInfo: any = useSelector((state: any) => state.auth.loginInfo);

  const communityDetail: Feed = useSelector(
    (state: any) => state.community.communityDetail
  );

  const goBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.back();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    if (confirm("정말 삭제하시겠습니까?")) {
      dispatch(remove(communityDetail.id))
        .unwrap()
        .then((res) => {
          alert("삭제되었습니다.");
          router.push("/community");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <HeaderBox>
      <Toolbar>
        <Grid container>
          <Grid item xs={11} sx={{ display: "flex" }}>
            <a onClick={goBack}>
              <ArrowBackIcon />
            </a>
            <Typography>커뮤니티글</Typography>
          </Grid>
          <Grid item xs={1}>
            {isLoggedIn && loginInfo.id === communityDetail.userId && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDelete}>삭제</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>수정</MenuItem>
                </Menu>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </HeaderBox>
  );
}

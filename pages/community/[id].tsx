import React, { FC, useEffect, useState } from "react";

import Layout from "@layout/Layout";
import Grid from "@mui/material/Grid";

import CommunityDesc from "../../assets/img/temp/community_desc.png";
import CommunityUser from "../../assets/img/temp/community_user_icon.png";
import CommunityComments from "../../assets/img/temp/community_comments.png";
import CommunityLike from "../../assets/img/temp/community_like.png";

import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import {
  getDetail,
  getList,
  remove,
  removeComment,
} from "../../actions/community";
import { useDispatch, useSelector } from "react-redux";
import communitySlice from "@reducers/community";
import { useRouter } from "next/router";
import { AppDispatch } from "../../store/configureStore";
import { Feed, FeedComment } from "../../type/community/community";
import CustomLink from "@cp/common/CustomLink";
import ProductLayout from "@layout/CommunityDetailLayout";
import { CommunityImgSwiper } from "@cp/community/CommunityImgSwiper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { removeComments } from "@babel/types";
import productSlice from "@reducers/product";

const CommunityHeaderGrid = styled(Grid)`
  padding: 20px;
  img {
    width: 100%;
  }
  .grid-community-category-button {
    margin-bottom: 25px;
    button {
      height: 40px;
      width: 60px;
      border-radius: 120px;
      font-size: 16px;
      line-height: 24px;
      border: 1px solid #5bbd6b;
      color: white;
      background-color: #5bbd6b;
    }
  }
  .grid-community-title {
    margin-bottom: 30px;
    p {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }
  }
  .grid-community-user {
    .grid-community-user-info {
      div {
        margin-left: 10px;
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #919191;
        }
      }
    }
  }
  .grid-community-like {
    div {
      margin-top: 15px;
      margin-left: 7px;
      display: flex;
      img {
        width: 24px;
        margin-right: 7px;
      }
    }
    color: #919191;
  }
  .grid-community-comments {
    div {
      margin-top: 15px;
      margin-left: 7px;
      display: flex;
      img {
        width: 24px;
        margin-right: 7px;
      }
    }
    color: #919191;
  }
`;

const CommunityDescGrid = styled(Grid)`
  padding: 20px;
  .grid-community-desc {
    p {
      font-weight: 400;
      font-size: 16px;
      color: #4e4e4e;
    }
  }
  .grid-community-location {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    svg {
      color: #a7a7a7;
    }
    p {
      margin-left: 10px;
      font-weight: 400;
      font-size: 16px;
      color: #383838;
    }
  }
`;
const CommunityCommentHeaderGrid = styled(Grid)`
  padding: 20px;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  .title {
    color: #000000;
  }
  .count {
    margin-left: 5px;
    color: #fc6e51;
  }
  .grid-community-comments-user {
    margin-top: 20px;
    img {
      height: 40px;
    }
    p {
      margin-left: 10px;
      font-weight: 400;
      font-size: 16px;
      color: #919191;
    }
  }
`;
const CommunityCommentGrid = styled(Grid)`
  padding: 20px;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  .title {
    color: #000000;
  }
  .count {
    margin-left: 5px;
    color: #fc6e51;
  }
  .grid-community-comments-user {
    margin-top: 20px;
    img {
      height: 40px;
    }
    p {
      margin-left: 10px;
      font-weight: 400;
      font-size: 16px;
      color: #919191;
    }
  }
  .grid-community-comments-desc {
    margin-top: 15px;
    margin-left: 60px;
  }
`;

const CommunityDetailComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;

  const isLoggedIn: Boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  const loginInfo: any = useSelector((state: any) => state.auth.loginInfo);

  const communityDetail: Feed = useSelector(
    (state: any) => state.community.communityDetail
  );

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (commentId: number) => {
    setAnchorEl(null);
    if (confirm("정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");

      console.log(commentId);

      /*const mappedCommentList = communityDetail.commentList.filter((f) => {
        return f.id !== commentId;
      });

      dispatch(
        communitySlice.actions.setCommunityDetailComment(mappedCommentList)
      );*/
      /*dispatch(removeComment(commentId))
        .unwrap()
        .then((res) => {
        })
        .catch((e) => {
          console.log(e);
        });*/
    }
  };

  return (
    <ProductLayout>
      <CommunityHeaderGrid container>
        <Grid item xs={12} className={"grid-community-category-button"}>
          <Button>{communityDetail.categoryName}</Button>
        </Grid>
        <Grid item xs={12} className={"grid-community-title"}>
          <Typography>{communityDetail.title}</Typography>
        </Grid>
        <Grid item container xs={12} className={"grid-community-user"}>
          <Grid item xs={1}>
            <img src={CommunityUser.src} />
          </Grid>
          <Grid item xs={8} className={"grid-community-user-info"}>
            <Box>
              <Typography>{communityDetail.username}</Typography>
              <Typography>{communityDetail.created}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} className={"grid-community-like"}>
            <Box>
              <img src={CommunityLike.src} />
              <Typography>{communityDetail.like}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} className={"grid-community-comments"}>
            <Box>
              <img src={CommunityComments.src} />
              <Typography>{communityDetail.comments}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CommunityHeaderGrid>
      <Grid container>
        <Grid item xs={12}>
          {communityDetail && communityDetail.descImg.length > 0 && (
            <CommunityImgSwiper imgList={communityDetail.descImg} />
          )}
        </Grid>
      </Grid>
      <CommunityDescGrid container>
        <Grid item xs={12} className={"grid-community-desc"}>
          <Typography>{communityDetail.desc}</Typography>
        </Grid>
        <Grid item xs={12} className={"grid-community-location"}>
          <LocationOnIcon />
          <Typography>{communityDetail.location}</Typography>
        </Grid>
      </CommunityDescGrid>
      <Divider sx={{ borderWidth: "4px" }} />
      {communityDetail && communityDetail.descImg.length > 0 && (
        <>
          <CommunityCommentHeaderGrid
            item
            xs={12}
            className={"grid-community-comments-header"}
          >
            <Typography className={"title"}>댓글 </Typography>
            <Typography className={"count"}>
              {communityDetail.comments}
            </Typography>
          </CommunityCommentHeaderGrid>
          {communityDetail.commentList.map((comment: FeedComment) => {
            return (
              <>
                <CommunityCommentGrid container key={comment.id}>
                  <Grid
                    item
                    container
                    xs={12}
                    className={"grid-community-comments-user"}
                  >
                    <Grid item xs={1}>
                      <img src={CommunityUser.src} />
                    </Grid>
                    <Grid item xs={10} className={"grid-community-user-info"}>
                      <Box>
                        <Typography>{comment.username}</Typography>
                        <Typography>{comment.created}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      {isLoggedIn && loginInfo.id === comment.userId && (
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
                            <MenuItem onClick={(e) => handleDelete(comment.id)}>
                              삭제
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>수정</MenuItem>
                          </Menu>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={"grid-community-comments-desc"}>
                    <Typography>{comment.desc}</Typography>
                  </Grid>
                </CommunityCommentGrid>
                <Divider
                  sx={{
                    borderWidth: "1px",
                    width: "90%",
                    margin: "0px auto",
                  }}
                />
              </>
            );
          })}
        </>
      )}
    </ProductLayout>
  );
};

export default CommunityDetailComponent;

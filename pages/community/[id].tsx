import React, { FC, useCallback, useEffect, useRef, useState } from "react";

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
  getDetailComment,
  getList,
  remove,
  removeComment,
} from "../../actions/community";
import { useDispatch, useSelector } from "react-redux";
import communitySlice from "@reducers/community";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../store/configureStore";
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
import MeatBallImg from "../../assets/img/temp/meatball_icon.png";
import { LoginInfo } from "../../type/auth/auth";

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
  .grid-community-comment-menu {
    display: none;
    position: absolute;
    top: 50%;
    left: 75%;
    z-index: 1;
    border: 1px solid #e9e9e9;
    background: #ffffff;
    border-radius: 8px;
    text-align: center;
    p {
      padding: 15px;
      font-weight: 400;
      font-size: 16px;
      color: #000000;
      cursor: pointer;
    }
  }
  .meatball_icon {
    width: 24px;
    height: 24px !important;
    cursor: pointer;
  }
`;

const CommunityDetailComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const menuRef = useRef(new Array(5));

  const handleClick = (e: any) => {
    const hasClass = e.target.classList.contains("comment_menu");
    if (!hasClass) {
      communityDetailCommentList.forEach((f: FeedComment, index: number) => {
        menuRef.current[index].style.display = "none";
      });
    }
  };

  const isLoggedIn: Boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const loginInfo: LoginInfo = useSelector(
    (state: RootState) => state.auth.loginInfo
  );

  const communityDetail: Feed = useSelector(
    (state: RootState) => state.community.communityDetail
  );

  const communityDetailCommentList: FeedComment[] = useSelector(
    (state: RootState) => state.community.communityDetailCommentList
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    dispatch(getDetail(id));
    dispatch(getDetailComment(id));
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleClickCommentMenu = (index: number) => {
    communityDetailCommentList.forEach((f: FeedComment, fIndex: number) => {
      if (fIndex !== index) menuRef.current[fIndex].style.display = "none";
    });
    const isShowMenu = menuRef.current[index].style.display;

    isShowMenu === "block"
      ? (menuRef.current[index].style.display = "none")
      : (menuRef.current[index].style.display = "block");
  };

  const handleClickDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      const mappedCommentList = communityDetailCommentList.filter(
        (f: FeedComment) => {
          return f.id !== id;
        }
      );
      dispatch(
        communitySlice.actions.communityDetailCommentList(mappedCommentList)
      );
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
      {communityDetailCommentList.length > 0 && (
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
          {communityDetailCommentList.map(
            (comment: FeedComment, index: number) => {
              return (
                <Box key={comment.id}>
                  <CommunityCommentGrid container sx={{ position: "relative" }}>
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
                        <img
                          className={"comment_menu meatball_icon"}
                          src={MeatBallImg.src}
                          onClick={(e) => handleClickCommentMenu(index)}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className={"grid-community-comments-desc"}
                    >
                      <Typography>{comment.desc}</Typography>
                    </Grid>
                    <Box
                      className={"grid-community-comment-menu comment_menu"}
                      ref={(element) => {
                        return (menuRef.current[index] = element);
                      }}
                    >
                      {isLoggedIn && loginInfo.id === comment.userId && (
                        <>
                          <Typography
                            className={"comment_menu"}
                            onClick={(e) => handleClickDelete(comment.id)}
                          >
                            삭제
                          </Typography>
                          <Divider className={"comment_menu"} />
                          <Typography className={"comment_menu"}>
                            수정
                          </Typography>
                          <Divider className={"comment_menu"} />
                        </>
                      )}
                      <Typography className={"comment_menu"}>
                        답댓글쓰기
                      </Typography>
                    </Box>
                  </CommunityCommentGrid>
                  <Divider
                    sx={{
                      borderWidth: "1px",
                      width: "90%",
                      margin: "0px auto",
                    }}
                  />
                </Box>
              );
            }
          )}
        </>
      )}
    </ProductLayout>
  );
};

export default CommunityDetailComponent;

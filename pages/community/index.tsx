import React, { FC, useEffect } from "react";

import Layout from "@layout/Layout";
import Grid from "@mui/material/Grid";

import CommunityUser from "../../assets/img/temp/community_user_icon.png";
import CommunityComments from "../../assets/img/temp/community_comments.png";
import CommunityLike from "../../assets/img/temp/community_like.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { getList } from "../../actions/community";
import { useDispatch, useSelector } from "react-redux";
import communitySlice from "@reducers/community";
import CustomLink from "@cp/common/CustomLink";
import { CommunityReqData, Feed } from "../../type/community/community";
import { AppDispatch } from "../../store/configureStore";

//styled-component
import {
  CommunityHeaderGrid,
  CommunityDescGrid,
} from "../../assets/styles/styled/community/communityList";

const Shop: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const communityReqData: CommunityReqData = {
    page: 0,
    size: 10,
    sort: "like",
    category: "all",
  };

  const communityList: Feed[] = useSelector(
    (state: any) => state.community.communityList
  );

  const selectedCategory: string = useSelector(
    (state: any) => state.community.selectedCategory
  );

  const selectedSort: string = useSelector(
    (state: any) => state.community.selectedSort
  );

  useEffect(() => {
    dispatch(communitySlice.actions.setSelectedSort("like"));
    dispatch(communitySlice.actions.setSelectedCategory("all"));
    dispatch(getList(communityReqData));
  }, []);

  const handleClickSort = (selectedSort: string) => {
    dispatch(communitySlice.actions.setSelectedSort(selectedSort));
    communityReqData.category = selectedCategory;
    communityReqData.sort = selectedSort;
    dispatch(getList(communityReqData));
  };

  const handleClickCategory = (selectedCategory: string) => {
    dispatch(communitySlice.actions.setSelectedCategory(selectedCategory));
    communityReqData.sort = selectedSort;
    communityReqData.category = selectedCategory;
    dispatch(getList(communityReqData));
  };

  return (
    <Layout>
      <CommunityHeaderGrid container>
        <Grid item container xs={12} className={"grid-category-button"}>
          <Grid item xs={1.5}>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClickCategory("all")
              }
              className={selectedCategory === "all" ? "selected_category" : ""}
            >
              전체
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClickCategory("equipment")
              }
              className={
                selectedCategory === "equipment" ? "selected_category" : ""
              }
            >
              장비
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClickCategory("cooking")
              }
              className={
                selectedCategory === "cooking" ? "selected_category" : ""
              }
            >
              요리
            </Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClickCategory("place")
              }
              className={
                selectedCategory === "place" ? "selected_category" : ""
              }
            >
              장소
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Box className={"box-sort"}>
              <Box
                className={
                  selectedSort === "like" ? "selected_sort like" : "like"
                }
                onClick={(e) => handleClickSort("like")}
              >
                공감순
              </Box>
              |
              <Box
                className={
                  selectedSort === "near" ? "selected_sort near" : "near"
                }
                onClick={(e) => handleClickSort("near")}
              >
                가까운순
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CommunityHeaderGrid>
      <Divider sx={{ borderWidth: "1px" }} />
      {communityList.map((community: Feed) => {
        return (
          <Box key={community.id}>
            <CommunityDescGrid container>
              <Grid item xs={1} className={"grid-desc-category"}>
                <CustomLink href={"/community/" + community.id}>
                  <Typography>{community.categoryName}</Typography>
                </CustomLink>
              </Grid>
              <Grid item xs={11} className={"grid-desc-title"}>
                <CustomLink href={"/community/" + community.id}>
                  <Typography>{community.title}</Typography>
                </CustomLink>
              </Grid>
              <Grid item xs={12} className={"grid-desc-detail"}>
                <CustomLink href={"/community/" + community.id}>
                  <Typography>{community.desc}</Typography>
                </CustomLink>
              </Grid>
              <Grid item xs={12} className={"grid-desc-img"}>
                <CustomLink href={"/community/" + community.id}>
                  <img src={community.img} />
                </CustomLink>
              </Grid>
              <Grid item xs={9} className={"grid-desc-user-img"}>
                <CustomLink href={"/community/" + community.id}>
                  <img src={CommunityUser.src} />
                </CustomLink>
                <Typography>{community.username}</Typography>
              </Grid>
              <Grid item xs={1.5} className={"grid-desc-like"}>
                <Box>
                  <img src={CommunityLike.src} />{" "}
                  <Typography>{community.like}</Typography>
                </Box>
              </Grid>
              <Grid item xs={1.5} className={"grid-desc-comment"}>
                <Box>
                  <img src={CommunityComments.src} />{" "}
                  <Typography>{community.comments}</Typography>
                </Box>
              </Grid>
            </CommunityDescGrid>
            <Divider sx={{ borderWidth: "3px" }} />
          </Box>
        );
      })}
    </Layout>
  );
};

export default Shop;

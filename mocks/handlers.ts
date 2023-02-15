// handlers.ts

import { rest } from "msw";
import { Product } from "../type/product/product";
import { mockCategoryList, mockProductList } from "./mockData/product";
import { mockCommunityList } from "./mockData/community";
import { mockShopCategoryList } from "./mockData/shop";
import { mockBannerList } from "./mockData/banner";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  rest.get(BASE_URL + "/api/v1/banner", (req, res, ctx) => {
    return res(ctx.json(mockBannerList));
  }),
  rest.get(BASE_URL + "/api/v1/shop/category", (req, res, ctx) => {
    return res(ctx.json(mockShopCategoryList));
  }),
  rest.get(BASE_URL + "/api/v1/product", (req, res, ctx) => {
    const { sort, isList, category } = Object.fromEntries(
      new URLSearchParams(req.url.search)
    );

    let productList: Product[] = mockProductList;

    productList = productList.map((m) => {
      return {
        ...m,
        img: isList === "true" ? [m.img[0]] : [m.img[1]],
        rank: isList === "true" ? null : m.rank,
      };
    });

    if (category && category !== "0") {
      console.log("category: ", category);
      productList = productList.filter((f) => {
        return f.categoryCode === Number(category);
      });
      console.log("productList: ", productList);
    }

    if (sort) {
      productList = productList.sort((a, b) => {
        if (sort === "1") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return res(ctx.json(productList));
  }),
  rest.get(BASE_URL + "/api/v1/product/category", (req, res, ctx) => {
    return res(ctx.json(mockCategoryList));
  }),
  rest.get(BASE_URL + "/api/v1/product/:id", (req, res, ctx) => {
    const { id } = req.params;
    const productList = mockProductList;

    const detail = productList.find((f) => {
      return f.id === Number(id);
    });

    return res(ctx.json(detail));
  }),
  rest.get(BASE_URL + "/api/v1/community", (req, res, ctx) => {
    const { sort, category } = Object.fromEntries(
      new URLSearchParams(req.url.search)
    );

    let communityList = mockCommunityList;

    if (sort) {
      communityList = communityList.sort((a, b) => {
        if (sort === "like") {
          return b.like - a.like;
        } else {
          return a.distance - b.distance;
        }
      });
    }

    if (category !== "all") {
      communityList = communityList.filter((f) => {
        return f.categoryCode === category;
      });
    }

    return res(ctx.json(communityList));
  }),
  rest.get(BASE_URL + "/api/v1/community/:id", (req, res, ctx) => {
    const { id } = req.params;
    const communityList = mockCommunityList;

    const detail = communityList.find((f) => {
      return f.id === Number(id);
    });

    return res(ctx.json(detail));
  }),
  rest.delete(BASE_URL + "/api/v1/community/:id", (req, res, ctx) => {
    const { id } = req.params;

    const communityList = mockCommunityList;

    const filteredList = communityList.filter((f) => {
      return f.id !== Number(id);
    });

    return res(ctx.json(filteredList));
  }),
];

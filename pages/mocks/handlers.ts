// handlers.ts

import { rest } from "msw";
import Product1 from "../../assets/img/temp/product1.png";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  rest.get(BASE_URL + "/api/v1/product", (req, res, ctx) => {
    //const { productId } = req.params;

    console.log(BASE_URL + "/api/v1/product");

    //temp product
    const product = {
      img: [Product1.src],
      label: "무료배송",
      like: true,
      soldOut: false,
      rank: 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 31,
      price: 46800,
      category: "터널",
    };
    const product2 = {
      img: [Product1.src],
      label: "무료배송",
      like: true,
      soldOut: true,
      rank: 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 31,
      price: 46800,
      category: "원터치",
    };

    const productList = [product, product2, product, product2];

    //const product = products.filter((product) => product.id === productId)[0];

    return res(ctx.json(productList));
  }),

  rest.get("https://example.com/reviews", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "31",
          author: "길동쓰",
          content: "맛있는 바나나 👍 🍌",
        },
      ])
    );
  }),
];

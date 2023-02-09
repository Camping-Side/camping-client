// handlers.ts

import { rest } from "msw";
import Product1 from "../assets/img/temp/product1.png";
import ProductList1 from "../assets/img/temp/productList1.png";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  rest.get(BASE_URL + "/api/v1/product", (req, res, ctx) => {
    console.log("req: ", req);

    const isList = req.url.search.includes("isList=true");
    const sort = req.url.search.includes("sort=1")
      ? "1"
      : req.url.search.includes("sort=2")
      ? "2"
      : "";
    const product1 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "무료배송",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 10,
      price: 11000,
      category: "터널",
    };
    const product2 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "당일배송",
      like: false,
      soldOut: true,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 40,
      price: 33000,
      category: "원터치",
    };
    const product3 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 15,
      price: 22900,
      category: "원터치",
    };
    const product4 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 20,
      price: 77000,
      category: "원터치",
    };
    const product5 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "마감임박",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 80,
      price: 22000,
      category: "원터치",
    };
    const product6 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 55,
      price: 9900,
      category: "원터치",
    };
    const product7 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "",
      like: false,
      soldOut: true,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 10,
      price: 32000,
      category: "원터치",
    };
    const product8 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "무료배송",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 20,
      price: 44400,
      category: "원터치",
    };
    const product9 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 30,
      price: 41000,
      category: "원터치",
    };
    const product10 = {
      img: isList ? [ProductList1.src] : [Product1.src],
      label: "무료배송",
      like: false,
      soldOut: false,
      rank: isList ? null : 1,
      brand: "HAEUL",
      name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
      dcRate: 22,
      price: 9500,
      category: "원터치",
    };

    let productList = [
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
      product7,
      product8,
      product9,
      product10,
    ];

    if (sort) {
      productList = productList.sort((a, b) => {
        if (sort === "1") {
          console.log("1");
          return a.price - b.price;
        } else {
          console.log("2");
          return b.price - a.price;
        }
      });
    }

    return res(ctx.json(productList));
  }),
];

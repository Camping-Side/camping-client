// handlers.ts

import { rest } from "msw";
import Product1 from "../assets/img/temp/product1.png";
import ProductList1 from "../assets/img/temp/productList1.png";
import CommunityDesc from "../assets/img/temp/community_desc.png";
import CommunityDesc2 from "../assets/img/temp/community_desc2.png";
import ProductDetail1 from "../assets/img/temp/product_detail.png";
import ProductDetail2 from "../assets/img/temp/product_detail2.png";
import ProductDetail3 from "../assets/img/temp/product_detail3.png";
import ProductDetail4 from "../assets/img/temp/product_detail4.png";
import ProductDetail5 from "../assets/img/temp/product_detail5.png";
import ProductDetail6 from "../assets/img/temp/product_detail6.png";
import ProductDetail7 from "../assets/img/temp/product_detail7.png";
import ProductDesc from "../assets/img/temp/product_desc.png";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  id: number;
  img: string[];
  label: string;
  like: boolean;
  soldOut: boolean;
  rank: number | null;
  brand: string;
  name: string;
  dcRate: number;
  price: number;
  category: string;
  detailImg: string[];
  desc: string;
  originPrice: number;
};

const product1 = {
  id: 1,
  img: [ProductList1.src, Product1.src],
  label: "무료배송",
  like: false,
  soldOut: false,
  rank: 1,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 10,
  price: 11000,
  category: "터널",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 22000,
};
const product2 = {
  id: 2,
  img: [ProductList1.src, Product1.src],
  label: "당일배송",
  like: false,
  soldOut: true,
  rank: 2,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 40,
  price: 33000,
  category: "원터치",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 66000,
};
const product3 = {
  id: 3,
  img: [ProductList1.src, Product1.src],
  label: "",
  like: false,
  soldOut: false,
  rank: 3,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 15,
  price: 22900,
  category: "원터치",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 33000,
};
const product4 = {
  id: 4,
  img: [ProductList1.src, Product1.src],
  label: "",
  like: false,
  soldOut: false,
  rank: 4,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 20,
  price: 77000,
  category: "터널",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 99000,
};
const product5 = {
  id: 5,
  img: [ProductList1.src, Product1.src],
  label: "마감임박",
  like: false,
  soldOut: false,
  rank: 5,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 80,
  price: 22000,
  category: "돔",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 55000,
};
const product6 = {
  id: 6,
  img: [ProductList1.src, Product1.src],
  label: "",
  like: false,
  soldOut: false,
  rank: 6,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 55,
  price: 9900,
  category: "차박",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 20000,
};
const product7 = {
  id: 7,
  img: [ProductList1.src, Product1.src],
  label: "",
  like: false,
  soldOut: true,
  rank: 7,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 10,
  price: 32000,
  category: "돔",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 52000,
};
const product8 = {
  id: 8,
  img: [ProductList1.src, Product1.src],
  label: "무료배송",
  like: false,
  soldOut: false,
  rank: 8,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 20,
  price: 44400,
  category: "차박",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 62000,
};
const product9 = {
  id: 9,
  img: [ProductList1.src, Product1.src],
  label: "",
  like: false,
  soldOut: false,
  rank: 9,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 30,
  price: 41000,
  category: "하울",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 62000,
};
const product10 = {
  id: 10,
  img: [ProductList1.src, Product1.src],
  label: "무료배송",
  like: false,
  soldOut: false,
  rank: 10,
  brand: "HAEUL",
  name: "너도밤나무 파인우드행어 원목 감성캠핑용품 인디언행어",
  dcRate: 22,
  price: 9500,
  category: "하울",
  detailImg: [
    ProductDetail1.src,
    ProductDetail2.src,
    ProductDetail3.src,
    ProductDetail4.src,
    ProductDetail5.src,
    ProductDetail6.src,
    ProductDetail7.src,
  ],
  desc: ProductDesc.src,
  originPrice: 32000,
};

const feed1 = {
  id: 1,
  img: CommunityDesc.src,
  categoryName: "전체",
  categoryCode: "all",
  title: "안목해변 가보세요~ 이번 주말에 다녀왔어요",
  desc: "바다가 너무 예뻐요! 노을질 때나 일출때 추천드려요",
  username: "오늘은내가캠핑왕",
  distance: 10,
  like: 32,
  comments: 32,
};
const feed2 = {
  id: 2,
  img: CommunityDesc2.src,
  categoryName: "요리",
  categoryCode: "cooking",
  title: "역시 캠핑엔 고기랑 꼬치죠~!!",
  desc: "제가 최근에 구매한 것들중에 제일 꿀템같아요!! 같이 써봤으면 좋겠어서 내용 공유합니다. 밑에 산 정보 뿌려요!!",
  username: "요리왕비룡",
  distance: 22,
  like: 22,
  comments: 11,
};
const feed3 = {
  id: 3,
  img: CommunityDesc.src,
  categoryName: "전체",
  categoryCode: "all",
  title: "안목해변 가보세요~ 이번 주말에 다녀왔어요",
  desc: "바다가 너무 예뻐요! 노을질 때나 일출때 추천드려요",
  username: "오늘은내가캠핑왕",
  distance: 10,
  like: 90,
  comments: 4,
};
const feed4 = {
  id: 4,
  img: CommunityDesc2.src,
  categoryName: "장소",
  categoryCode: "place",
  title: "역시 캠핑엔 고기랑 꼬치죠~!!",
  desc: "제가 최근에 구매한 것들중에 제일 꿀템같아요!! 같이 써봤으면 좋겠어서 내용 공유합니다. 밑에 산 정보 뿌려요!!",
  username: "요리왕비룡",
  distance: 66,
  like: 1,
  comments: 3,
};
const feed5 = {
  id: 5,
  img: CommunityDesc2.src,
  categoryName: "장비",
  categoryCode: "equipment",
  title: "제일가까운곳!!!",
  desc: "정렬시 제일가까운곳입니다!!",
  username: "집돌이",
  distance: 1,
  like: 23,
  comments: 99,
};
const feed6 = {
  id: 6,
  img: CommunityDesc2.src,
  categoryName: "장소",
  categoryCode: "place",
  title: "공감이 제일많은 글이에요!!",
  desc: "공감이 제일많습니다!!",
  username: "공감능력최상",
  distance: 99,
  like: 687,
  comments: 99,
};

export const handlers = [
  rest.get(BASE_URL + "/api/v1/product", (req, res, ctx) => {
    const { sort, isList } = Object.fromEntries(
      new URLSearchParams(req.url.search)
    );

    let productList: Product[] = [
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

    productList = productList.map((m) => {
      return {
        ...m,
        img: isList === "true" ? [m.img[0]] : [m.img[1]],
        rank: isList === "true" ? null : m.rank,
      };
    });

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
  rest.get(BASE_URL + "/api/v1/product/:id", (req, res, ctx) => {
    const { id } = req.params;
    const productList = [
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

    const detail = productList.find((f) => {
      return f.id === Number(id);
    });

    return res(ctx.json(detail));
  }),
  rest.get(BASE_URL + "/api/v1/community", (req, res, ctx) => {
    const { sort, category } = Object.fromEntries(
      new URLSearchParams(req.url.search)
    );

    let communityList = [feed1, feed2, feed3, feed4, feed5, feed6];

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
    const communityList = [feed1, feed2, feed3, feed4, feed5, feed6];

    const detail = communityList.find((f) => {
      return f.id === Number(id);
    });

    return res(ctx.json(detail));
  }),
];

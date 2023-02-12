export type ProductReqData = {
  page: number;
  size: number;
  keyword: string;
  startDate: string;
  endDate: string;
  isList: Boolean;
  sort: string;
  category: number;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
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
  categoryCode: number;
  originPrice: number;
  desc: string;
};

export type SubImage = {
  url: string;
  isSelected: boolean;
};

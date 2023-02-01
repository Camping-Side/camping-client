type ReqDto = {
  page: number;
  size: number;
  keyword: string;
  startDate: string;
  endDate: string;
};

export const reqDto: ReqDto = {
  page: 0,
  size: 10,
  keyword: "",
  startDate: "",
  endDate: "",
};

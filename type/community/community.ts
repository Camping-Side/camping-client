export type CommunityReqData = {
  page: number;
  size: number;
  sort: string;
  category: string;
};

export type Feed = {
  id: number;
  img: string;
  categoryName: string;
  categoryCode: string;
  title: string;
  desc: string;
  username: string;
  distance: number;
  like: number;
  comments: number;
};

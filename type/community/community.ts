export type CommunityReqData = {
  page: number;
  size: number;
  sort: string;
  category: string;
};

export type FeedComment = {
  id: number;
  userId: number;
  feedId: number;
  username: string;
  desc: string;
  created: string;
};

export type Feed = {
  id: number;
  img: string;
  descImg: string[];
  categoryName: string;
  categoryCode: string;
  title: string;
  desc: string;
  username: string;
  distance: number;
  like: number;
  comments: number;
  userId: number;
  created: string;
  location: string;
};

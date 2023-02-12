import CommunityDesc from "../../assets/img/temp/community_desc.png";
import CommunityDesc2 from "../../assets/img/temp/community_desc2.png";

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

export const mockCommunityList = [feed1, feed2, feed3, feed4, feed5, feed6];

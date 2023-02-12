import React, { FC, useEffect } from "react";
import ProductLayout from "@layout/ProductLayout";
import Grid from "@mui/material/Grid";
import ProductLike from "../../../assets/img/temp/productLike.svg";
import ProductDislike from "../../../assets/img/temp/productDislike.svg";
import { NumberCommaFilter } from "../../../util/commonFilter";
import { CategoryTab } from "@cp/product/CategoryTab";
import { useRouter } from "next/router";
import CustomLink from "@cp/common/CustomLink";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SelectChangeEvent } from "@mui/material/Select";
import { getCategoryList, getList } from "../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import {
  Category,
  Product,
  ProductReqData,
} from "../../../type/product/product";
import productSlice from "@reducers/product";
import { AppDispatch } from "../../../store/configureStore";

//styled-component
import {
  ProductImageStyle,
  ProductInfoGrid,
  ProductListInfoGrid,
} from "../../../assets/styles/styled/product/productList";

const ProductComponent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const query = router.query;

  const productList: Product[] = useSelector(
    (state: any) => state.product.productList
  );

  const categoryList: Category[] = useSelector(
    (state: any) => state.product.categoryList
  );

  const selectedSort: string = useSelector(
    (state: any) => state.product.selectedSort
  );

  const productReqData: ProductReqData = {
    page: 0,
    size: 10,
    keyword: "",
    startDate: "",
    endDate: "",
    isList: false,
    sort: "",
    category: 0,
  };

  useEffect(() => {
    productReqData.isList = true;
    // @ts-ignore
    dispatch(getList(productReqData));
    dispatch(getCategoryList());
  }, []);

  const handleChangeSort = (e: SelectChangeEvent) => {
    dispatch(productSlice.actions.setSelectedSort(e.target.value));
    productReqData.isList = true;
    productReqData.sort = e.target.value;

    dispatch(getList(productReqData));
  };

  const handleClickLike = (selectedId: number) => {
    const mappedProductList = productList.map((m: Product) => {
      return {
        ...m,
        like: selectedId === m.id ? !m.like : m.like,
      };
    });
    dispatch(productSlice.actions.setProductList(mappedProductList));
  };

  const [filter1, setFilter1] = React.useState("");
  const [filter2, setFilter2] = React.useState("");
  const [filter3, setFilter3] = React.useState("");

  const handleChangeFilter = (e: SelectChangeEvent, type: string) => {
    if (type === "filter1") {
      setFilter1(e.target.value);
    } else if (type === "filter2") {
      setFilter2(e.target.value);
    } else if (type === "filter3") {
      setFilter3(e.target.value);
    }
  };

  return (
    <ProductLayout category={query.category}>
      <CategoryTab
        categoryList={categoryList}
        productReqData={productReqData}
      />
      <ProductListInfoGrid container>
        <Grid item container xs={12} className={"grid-product-filter-margin"}>
          <Grid item xs={2}>
            <Select
              value={filter1}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter1");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터1</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              value={filter2}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter2");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터2</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              value={filter3}
              onChange={(e: SelectChangeEvent) => {
                handleChangeFilter(e, "filter3");
              }}
              IconComponent={KeyboardArrowDownIcon}
              displayEmpty
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5BBD6B",
                },
              }}
            >
              <MenuItem value="">필터3</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={9} className={"grid-product-text-padding"}>
          <Typography>상품 {productList.length}개</Typography>
        </Grid>
        <Grid item xs={3} className={"grid-product-sort-margin"}>
          <Select
            value={selectedSort}
            onChange={handleChangeSort}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
          >
            <MenuItem value="">정렬</MenuItem>
            <MenuItem value={"1"}>가격낮은순</MenuItem>
            <MenuItem value={"2"}>가격높은순</MenuItem>
          </Select>
        </Grid>
        <Grid item container xs={12}>
          {productList.map((product: Product) => {
            return (
              <ProductInfoGrid item container xs={6} key={product.id}>
                <Grid item xs={12} className={"grid-product-img-margin"}>
                  <ProductImageStyle>
                    <CustomLink href={"/shop/product/" + product.id}>
                      <img className={"image"} src={product.img[0]} />
                    </CustomLink>
                    {product.label && (
                      <div className={"label"}>{product.label}</div>
                    )}
                    {product.like && (
                      <img
                        className={"like"}
                        src={ProductLike.src}
                        onClick={() => {
                          handleClickLike(product.id);
                        }}
                      />
                    )}
                    {!product.like && (
                      <img
                        className={"like"}
                        src={ProductDislike.src}
                        onClick={() => {
                          handleClickLike(product.id);
                        }}
                      />
                    )}
                    {product.soldOut && (
                      <CustomLink href={"/shop/product/" + product.id}>
                        <div className={"sold-out"}>
                          <span className={"text"}>품절</span>
                        </div>
                      </CustomLink>
                    )}
                  </ProductImageStyle>
                </Grid>
                <CustomLink href={"/shop/product/" + product.id}>
                  <Box className={"div-product-desc"}>
                    <Grid item xs={12} className={"grid-product-brand"}>
                      {product.rank && (
                        <Typography className={"rank"}>
                          {product.rank}
                        </Typography>
                      )}
                      <Typography className={"brand"}>
                        {product.brand}
                      </Typography>
                    </Grid>
                    <Grid className={"grid-product-name"} item xs={12}>
                      <Typography>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={12} className={"grid-product-price"}>
                      {product.dcRate > 0 && (
                        <Typography className={"dcRate"}>
                          {product.dcRate}%
                        </Typography>
                      )}
                      <Typography className={"price"}>
                        {NumberCommaFilter(product.price)}원
                      </Typography>
                    </Grid>
                  </Box>
                </CustomLink>
              </ProductInfoGrid>
            );
          })}
        </Grid>
      </ProductListInfoGrid>
    </ProductLayout>
  );
};

export default ProductComponent;

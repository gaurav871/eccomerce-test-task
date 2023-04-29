import React, { useEffect, useState } from "react";
import useData from "../hooks/useData";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import ProgressSpinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import {
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  dataPerSlide,
} from "../utills/constant";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Product = () => {
  const { products, category, loading } = useData();
  const [productData, setProductData] = useState(products);
  const [categoryName, setCategoryName] = useState([]);
  const [next, setNext] = useState(dataPerSlide);

  useEffect(() => {
    if (categoryName?.length === 0) {
      setProductData(products);
    } else {
      const payload = [];
      products?.forEach((val) => {
        categoryName.includes(val?.category) && payload.push(val);
      });
      setProductData(payload);
    }
  }, [products, categoryName]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(typeof value === "string" ? value.split(",") : value);
    setNext(dataPerSlide);
  };

  const handleMoreImage = () => {
    setNext(next + dataPerSlide);
  };

  return loading ? (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <ProgressSpinner />
    </div>
  ) : (
    <div>
      <div className="container">
        {productData?.length > 0 && (
          <div className="d-flex">
            <FormControl sx={{ m: 2, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={categoryName}
                onChange={handleChange}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {category.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={categoryName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="filter-clear">
              <Button
                style={{ border: "1px solid" }}
                onClick={() => {
                  setCategoryName([]);
                  setNext(dataPerSlide);
                }}
                disabled={categoryName?.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        )}
        <div className="row justify-content-around">
          {productData?.length > 0 ? (
            productData?.slice(0, next)?.map((item) => ProductCard(item))
          ) : (
            <div className="d-flex justify-content-center font-weight-bold">
              No records available.
            </div>
          )}
        </div>
        {next < productData?.length && (
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "10px" }}
          >
            <Button
              className="mt-4"
              style={{ border: "2px solid" }}
              onClick={handleMoreImage}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

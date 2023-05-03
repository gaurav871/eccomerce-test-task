import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, delItem } from "../redux/actions/index";
import { Button, Rating } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProgressSpinner from "../components/Spinner";

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const proid = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${proid.id}`)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setProduct(json);
      });
  }, [proid]);

  const dispatch = useDispatch();

  const handleCart = (product) => {
    const payload = { ...product };
    payload.originalCost = payload.price;
    payload.quantity = 1;
    if (cartBtn === "Add to Cart") {
      dispatch(addItem(payload));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(delItem(payload));
      setCartBtn("Add to Cart");
    }
  };

  return loading ? (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <ProgressSpinner />
    </div>
  ) : (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        style={{ margin: "15px" }}
        onClick={() => history.push("/")}
      >
        Back to home
      </Button>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={product.image} alt={product.title} height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h3 className="display-6 fw-bold">{product.title}</h3>

            <div className="mt-2 product-category">
              <span>{product?.category}</span>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="my-4">${product.price}</h2>
              <Rating
                name="read-only"
                value={product?.rating?.rate ?? null}
                readOnly
              />
            </div>
            <p className="lead product-desc">{product.description}</p>
            <button
              onClick={() => handleCart(product)}
              className="btn btn-outline-primary my-5"
            >
              {cartBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

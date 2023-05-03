import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delItem } from "../redux/actions/index";
import { Button, ButtonGroup } from "@mui/material";

const Cart = () => {
  const state = useSelector((state) => state.addItem);

  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [isProductRemove, setIsProductRemove] = useState(false);

  useEffect(() => {
    const payload = [...state].map((val) => {
      return {
        ...val,
        quantity: 1,
      };
    });
    setCartData(payload);
    // eslint-disable-next-line
  }, [isProductRemove]);

  const handleClose = (item) => {
    setIsProductRemove(true);
    dispatch(delItem(item));
  };

  const handleAddQuantity = (index) => {
    const payload = [...cartData];
    payload[index].quantity += 1;
    payload[index].price = payload[index].quantity * state[index].price;
    setCartData(payload);
  };

  const handleDeleteItem = (index) => {
    const payload = [...cartData];
    payload[index].quantity -= 1;
    payload[index].price = payload[index].quantity * state[index].price;
    setCartData(payload);
  };

  const cartItems = (cartItem, index) => {
    return (
      <div
        className="px-4 my-5 bg-light rounded-3 cart-body-container"
        key={cartItem.id}
      >
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartData[index])}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">${cartItem.price}</p>
              <span>
                Quantity : <p className="lead fw-bold">{cartItem.quantity}</p>
              </span>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button
                  disabled={cartItem?.quantity === 1}
                  onClick={() => handleDeleteItem(index)}
                >
                  -
                </Button>
                <Button onClick={() => handleAddQuantity(index)}>+</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length > 0 && (
        <div className="total-amount">
          Total Amount : ${" "}
          {parseFloat(cartData.reduce((n, { price }) => n + price, 0)).toFixed(
            2
          )}
        </div>
      )}
      {state.length === 0 && emptyCart()}
      {state.length !== 0 &&
        cartData.map((val, index) => cartItems(val, index))}
    </>
  );
};

export default Cart;

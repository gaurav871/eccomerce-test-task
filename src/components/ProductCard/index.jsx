import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = (item) => {
  return (
    <div className="card my-5 py-4" key={item.id} style={{ width: "18rem" }}>
      <img src={item.image} className="card-img-top" alt={item.title} />
      <div className="card-body text-center">
        <h5 className="card-title" title={item.title}>
          {item.title}
        </h5>
        <p className="lead">${item.price}</p>
        <NavLink
          to={`/products/${item.id}`}
          className="btn btn-outline-primary"
        >
          Buy Now
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;

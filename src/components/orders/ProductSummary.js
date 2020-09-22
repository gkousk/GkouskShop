import React from 'react';

const ProductSummary = ({ product }) => {
  return (
    <div className="card grey purple-text">
      <div className="card-image">
        <img alt="" src={product.image}></img>
        <span className="card-title"></span>
      </div>
      <center>
        <div className="card-content" id="hotprd">
          {product.name}
          <br/>
          {product.price } € 
        </div>
      </center>
    </div>
  )
}

export default ProductSummary;
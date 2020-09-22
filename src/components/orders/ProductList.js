import React from 'react';
import ProductSummary from './ProductSummary'
import { Link } from 'react-router-dom';

const ProductList = ({ products, id, category }) => {
    if (category !== "") {
        return (
            <div className="project-list section">
                {products && products.map(product => {
                    if (product.category === category) {
                        return (
                            <div className="col s6 m6 l3">
                                <Link to={'/product/' + product.id} key={product.id}>
                                    <ProductSummary product={product} />
                                </Link>
                            </div>
                        )
                    }
                    else {
                        return null;
                    }

                })}
            </div>
        )
    }
    else {
        return null;
    }
}
export default ProductList;
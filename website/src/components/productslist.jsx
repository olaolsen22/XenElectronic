import React from 'react';

const ProductsList = ({ products, addToShoppingCart }) => {
  return (
    <div className='row products-container'>
      {products.map(product => {
        return <div className='col-lg-3 col-md-4 col-6' key={`product-item-${product.productName}`}>
          <div className='card'>
            <img src={product.productImageLink} className="card-img-top" alt="..."/>
            <div className='card-body'>
              <p className='card-title'>{product.productName}</p>
              <p className='card-product-price'>{
                new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'PHP' } ).format(product.productPrice)}</p>
            </div>
            <div className='card-footer'>
              <button className='btn btn-primary btn-add-to-cart' onClick={() => addToShoppingCart(product)}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      })}
    </div>
  );
};

export default ProductsList;

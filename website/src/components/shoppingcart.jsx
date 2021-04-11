import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ShoppingCart = ({ shoppingCartItems, removeProductFromShoppingCart, updateMultipleShoppingCartProducts }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Shopping Cart</h5>
        <div className='shopping-cart-products-container'>
          {
            shoppingCartItems.length === 0 ?
            <p className='empty-cart-message'>There are currently no products in your shopping cart.</p> :
            ''
          }
          {
            shoppingCartItems.map(product => { 
              return <div className='shopping-cart-product' key={`shopping-cart-product-${product._id}`}>
                <img src={product.productDetails[0].productImageLink} className="img-fluid" alt="..."/>
                <div className='product-details'>
                  <p className='font-weight-bold'>{product.productDetails[0].productName}</p>
                  <p>Type: {product.productDetails[0].productCategory}</p>
                  <p>Price: {new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'PHP' } ).format(product.productDetails[0].productPrice)}</p>
                </div>
                <button 
                  className='btn btn-link ml-auto'
                  onClick={() => removeProductFromShoppingCart(product._id)}
                >
                  <FaTrash/>
                </button>
              </div>
            })
          }
          <p className='font-weight-bold ml-auto mt-3 mb-2'>Total: {
            new Intl.NumberFormat( 
              'en-US',
              { 
                style: 'currency', 
                currency: 'PHP' 
              } ).format(shoppingCartItems.reduce((accumulator, currentValue) => accumulator + currentValue.productDetails[0].productPrice, 0))
          }</p>
          <button 
            className='btn btn-primary ml-auto'
            disabled={!shoppingCartItems.length > 0}
            onClick={() => updateMultipleShoppingCartProducts('CHECKOUT')}
          >Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

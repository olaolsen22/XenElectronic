import React, { Component } from "react";
import './App.css';
import NavBar from "./components/navbar";
import ProductsList from "./components/productslist";
import ShoppingCart from "./components/shoppingcart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    products: [],
    shoppingCartItems: [],
    totalShoppingCartItems: 0,
    showShoppingCart: false,
    category: '',
    loading: true,
    loadingCart: true
  }

  componentDidMount () {
    this.fetchProductsList('mobile')
    this.fetchShoppingCartList('mobile')
  }

  // API: GET ENDPOINTS
  fetchProductsList = (value) => {
    this.setState({ loading: true })
    fetch(`/products?productCategory=${value.toLowerCase()}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ products: data, category: value, loading: false, showShoppingCart: false })
    })
    .catch(console.log)
  }
  
  fetchShoppingCartList = () => {
    this.setState({ loadingCart: true })
    fetch('/shopping-cart')
    .then(res => res.json())
    .then((data) => {
      this.setState({ shoppingCartItems: data, totalShoppingCartItems: data.length, loadingCart: false })
    })
    .catch(console.log)
  }

  // API: POST ENDPOINTS
  addToShoppingCart = (product) => {
    this.setState({loadingCart: true})
    fetch('/shopping-cart', {
      'method': 'POST',
      'headers': {
        'content-type': 'application/json',
      },
      'body': JSON.stringify({
        productId: product._id
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.hasOwnProperty('error_code')) {
        toast.error(`Was not successful in adding item "${product.productName}" to the shopping cart.`);
      } else {
        this.fetchShoppingCartList()
        toast.success(`Item "${product.productName}" is now in your shopping cart!`);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  // API: PUT ENDPOINTS
  removeProductFromShoppingCart = (id) => {
    this.setState({loadingCart: true})
    fetch('/shopping-cart/update-product', {
      'method': 'PUT',
      'headers': {
        'content-type': 'application/json',
      },
      'body': JSON.stringify({
        _id: id,
        status: 'CANCEL'
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.hasOwnProperty('error_code')) {
        toast.error(`Was not successful in removing item from the shopping cart.`);
      } else {
        this.fetchShoppingCartList()
        toast.success(`Item is now removed from your shopping cart!`);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  // FOR CHECKOUT AND PAYMENTS
  updateMultipleShoppingCartProducts = (action) => {
    this.setState({loadingCart: true})
    fetch('/shopping-cart/update-multiple-products', {
      'method': 'PUT',
      'headers': {
        'content-type': 'application/json',
      },
      'body': JSON.stringify({
        status: action,
        currentStatus: action === 'CHECKOUT' ? 'ACTIVE' : 'CHECKOUT'
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.hasOwnProperty('error_code')) {
        toast.error(`Was not successful in ${action === 'CHECKOUT' ? 'checking out' : 'payment for'} products in shopping cart.`);
      } else {
        this.fetchShoppingCartList()
        if (action === 'CHECKOUT') {
          toast.success('Checkout success! Redirecting you to payment page.')
        } else {
          toast.success('Payment success! Thank you for shopping with us!')
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  toggleShoppingCart = (value) => {
    this.setState({showShoppingCart: value})
  }

  render () {
    return (
      <div>
        <NavBar 
          fetchProductsList={this.fetchProductsList}
          category={this.state.category}
          totalShoppingCartItems={this.state.totalShoppingCartItems}
          toggleShoppingCart={this.toggleShoppingCart}
          showShoppingCart={this.state.showShoppingCart}
        />
        <ToastContainer 
          hideProgressBar={true}
          autoClose={3000}
        />
        <div className='container pt-4'>
          {
            this.state.showShoppingCart ? 
            <ShoppingCart
              shoppingCartItems={this.state.shoppingCartItems}
              removeProductFromShoppingCart={this.removeProductFromShoppingCart}
              updateMultipleShoppingCartProducts={this.updateMultipleShoppingCartProducts}
            /> :
            this.state.loading ?
            <div className='spinner-container'>
              <div className="spinner-border text-primary" role="status">
              </div>
            </div> : 
            <ProductsList 
              products={this.state.products}
              addToShoppingCart={this.addToShoppingCart}
            />
          }
        </div>
      </div>
    )
  }
}

export default App;

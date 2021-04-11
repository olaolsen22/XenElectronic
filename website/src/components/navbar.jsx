import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const NavBar =({
  fetchProductsList,
  category,
  totalShoppingCartItems,
  showShoppingCart,
  toggleShoppingCart 
}) => {
  const navItems = ['Mobile', 'TV', 'Appliance']
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <a className='navbar-brand' href='/'>XenElectronic</a>
        <button 
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'/>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0 ml-auto'>
            {navItems.map(item => {
              return <li className='nav-item' key={`nav-item-link-${item}`}>
                <button
                  className={`btn btn-link nav-link ${category === item && !showShoppingCart ? 'active' : ''}`}
                  aria-current='page'
                  onClick={() => {fetchProductsList(item)}}
                > {item} </button>
              </li>
            })}
            <li className='nav-item'>
              <button 
                className={`btn btn-link nav-link`}
                aria-current='page'
                disabled
              >
                To Pay
              </button>
            </li>
            <li className='nav-item'>
              <button 
                className={`btn btn-link nav-link ${showShoppingCart ? 'active' : ''}`}
                aria-current='page'
                onClick={() => toggleShoppingCart(true)}
              >
                <FaShoppingCart/>
              </button>
              <span className='badge bg-primary'>{totalShoppingCartItems}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;
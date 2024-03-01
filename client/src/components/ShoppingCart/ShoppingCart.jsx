/* // App.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import CardDetails from '../CardDetails/CardDetails';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="App">
      <h1>Carrito de Compras</h1>
      <div className="content">
        <CardDetails addToCart={addToCart} />
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default ShoppingCart;
 */
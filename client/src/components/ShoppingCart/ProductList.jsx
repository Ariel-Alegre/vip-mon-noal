// ProductList.js
import React from 'react';

const products = { id: 1, name: 'Producto 1', price: 10 }


function ProductList({ addToCart }) {
  return (
    <div className="product-list">
      <h2>Productos Disponibles</h2>
      <ul>
        <li>
            <button onClick={() => addToCart(products)}>Agregar al Carrito</button>
          </li>
      </ul>
    </div>
  );
}

export default ProductList;

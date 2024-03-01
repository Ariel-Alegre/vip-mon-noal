import React from 'react';
import style from './index.module.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem({ item, index, removeFromCart }) {
  
  return (
    <li className="cart-item">
      <img className={style.list_img} src={item.imageFile[0]} alt="" />
      <div className={style.list_card}>
        {/* Muestra el nombre del producto */}
        <p>{item.product}</p>
        
        {/* Muestra el precio */}
        <p>€{item.price}</p>
        
        {/* Muestra cada talla en una línea separada */}
          <p >Talla: {item.size}</p>
        
        {/* Botón para eliminar del carrito */}
        <IconButton aria-label="delete" size="small" onClick={() => removeFromCart(index)}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </li>
  );
}


export default CartItem;

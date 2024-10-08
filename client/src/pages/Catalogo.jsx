import CardCatalogo from '../components/CardCatalogo/CardCatalogo';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import styles from '../loading.module.css';
import ButtonWhatsapp from '../components/ButtonWhatsaapp/ButtonWhatsaapp';

// Función para guardar los datos del carrito en localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Función para obtener los datos del carrito desde localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

export default function Catalogo() {
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
 
  
    // Cargar datos del carrito desde localStorage al montar el componente
    useEffect(() => {
      const savedCartItems = loadCartFromLocalStorage();
      setCartItems(savedCartItems);
    }, []);
  
 
    const removeFromCart = (index) => {
      const newCartItems = cartItems.filter((item, i) => i !== index);
      setCartItems(newCartItems);
      saveCartToLocalStorage(newCartItems);
    };
  
    useEffect(() => {
      setTimeout(async () => {
        setLoading(false);
      }, 1000);
    }, []);
    return (
        <div>
          <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />


            {loading ? (
        <div className={styles.loading}>
          <CircularProgress color="secondary"  />
        </div>
      ) : (
            <div>

          <CardCatalogo/> 

            <Footer/>
  <ButtonWhatsapp/>

            </div>
      )}
        </div>
    )
}
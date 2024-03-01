import Navbar from '../components/Navbar/Navbar';
import ContactUs from '../components/ContactUs/ContactUs';
import Footer from '../components/Footer/Footer';
import ButtonWhatsapp from '../components/ButtonWhatsaapp/ButtonWhatsaapp';
import React, { useState, useEffect } from "react";
import styles from '../loading.module.css'
import CircularProgress from "@mui/material/CircularProgress";


// Función para guardar los datos del carrito en localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Función para obtener los datos del carrito desde localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [selectedSize, setSelectedSize] = useState("");

  // Cargar datos del carrito desde localStorage al montar el componente
  useEffect(() => {
    const savedCartItems = loadCartFromLocalStorage();
    setCartItems(savedCartItems);
  }, []);

  // Función para agregar un elemento al carrito
  const addToCart = (product) => {
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
    saveCartToLocalStorage(newCartItems);
  };

  // Función para eliminar un elemento del carrito
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
  <ContactUs/>
  <Footer/>
  <ButtonWhatsapp/>
            </div>
      )}

        </div>
    )
    
}
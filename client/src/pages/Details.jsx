import * as React from "react";
import { useState, useEffect } from "react";
import CardDetails from "../components/CardDetails/CardDetails";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import styles from '../loading.module.css';
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";

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
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <CardDetails
            addToCart={addToCart}
            productDetails={productDetails}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <Footer />
      <ButtonWhatsapp />

        </div>
      )}
    </div>
  );
}

import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import ImgHome from "../components/ImgHome/ImgHome";
import Navbar from "../components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from '../loading.module.css'
import CounterVisit from "../components/CounterVisit/CounterVisit";
// Función para guardar los datos del carrito en localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Función para obtener los datos del carrito desde localStorage
const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};
export default function Home() {
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
        <ImgHome/>
      <div>
        <Card/>
      </div>
      <div>
        <Footer/>
      </div>
      <div>

      <ButtonWhatsapp />
      </div>
      <div>

      <CounterVisit/>
      </div>
      </div>
      )}
        
    </div>
  );
}

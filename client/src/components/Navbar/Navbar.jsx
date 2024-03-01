import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal, logout } from "../../redux/action";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import CartItem from "../ShoppingCart/CartItem";
import CircularProgress from "@mui/material/CircularProgress";

import { ProductDetail, Order, PaymentPaypal } from "../../redux/action";
import { useParams } from "react-router-dom";


const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "90vh", // Altura del componente
  overflowY: "auto", // Desplazamiento vertical
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "100%", // Cambiado el ancho para pantallas pequeñas
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};


const styleOrder = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "90vh", // Altura del componente
  overflowY: "auto", // Desplazamiento vertical
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "100%", // Cambiado el ancho para pantallas pequeñas
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};
function DrawerAppBar({ cartItems, removeFromCart }) {
  const { productId } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sizes = cartItems ? cartItems.map((item) => item.size || []) : [];


  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = useSelector((state) => state.token);
  const [openCart, setOpenCart] = React.useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);
  const datapersonal = useSelector((state) => state.datapersonal);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (token) {
      dispatch(dataPersonal(token));
    }
  }, [dispatch, token]);
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(logout()); // Despacha la acción de logout
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "#ffc400" }}>
        VIP MON NOAL
      </Typography>
      <Divider />
      <List>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/catalogo">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Catálogo" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/contacto">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Contácto" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container = window !== undefined ? window.document.body : undefined;
  
  
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[2]);

  const productDetails = useSelector((state) => state.productDetails);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState({
    product_id: "",
    product: "",
    price_total: "",

    size:[],
    name: "",
    lastName: "",
    email: "",

    phone: "",

    direction_1: "",
    direction_2: "",
    city: "",
    postal_code: "",
  });
  const [openOrder, setOpenOrder] = React.useState(false);
  const handleOpenOrder = () => {
    setOpenCart(false)
    setOpenOrder(true);
    setOrder((prevOrder) => ({
      ...prevOrder,
      product: productDetails.product,
      product_id: productDetails.id,
      price_total: total ,
      size:sizes,
    }));
  };
  const handleCloseOrder  = ()  =>{
     setOpenOrder(false)
  };

  const total = cartItems
  ? cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0) + (productDetails.price_send ? parseFloat(productDetails.price_send) : 0)
  : 0;

const formattedTotal = total.toFixed(2);


  React.useEffect(() => {
    dispatch(ProductDetail(productId));
  }, [dispatch, productId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el indicador de carga

    try {
      dispatch(Order(order));
    } catch (error) {
      console.error("Error durante el inicio de sesión", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga al finalizar
      alert("Pedido completado");
      window.location.reload();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,

      product: productDetails.product, // Agregar el nombre del producto
      product_id: productDetails.id,
      price_total: total ,

    });
  };


  const handleSize = (size) => {
    setSelectedSize((prevSizes) => {
      // Si el tamaño ya está seleccionado, lo eliminamos
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prevSizes, size];
      }
    });
    // Actualiza el estado del pedido con todas las tallas seleccionadas
    setOrder((prevOrder) => ({
      ...prevOrder,
      size: [size],
    }));
  };
 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#000" }}>
        <Modal
          open={openCart}
          onClose={handleCloseCart}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Carrito de Compras</h2>
            <ul>
            {cartItems && cartItems.map((item, index) => (
  <CartItem key={index} item={item} index={index} removeFromCart={removeFromCart} />
))}

            </ul>
            <div className={styles.total}>
              <strong>
              Precio total: €{formattedTotal}
              </strong>
              </div>
            <div><strong>+ €{productDetails.price_send} costo de envió a través de correos <img className={styles.correo} src={require('../../Images/Icono-payment/Correos-envio.jpg')} alt="" /> </strong></div>



            <div className={styles.buton_cart}>
              <Button
                onClick={handleCloseCart}
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red" },
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ffc400",
                  ":hover": { backgroundColor: "#ffc400" },
                }}
                onClick={handleOpenOrder}
              >
                Comprar
              </Button>
            </div>
          </Box>
        </Modal>



        <Modal
        onClose={handleCloseOrder}
        open={openOrder}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOrder}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Completa la compra
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Llene los datos para completar la compra.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Producto
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="product"
                        id="product"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={productDetails.product || order.product}
                        required
                    disabled

                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="product_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      id
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        autoComplete="given-name"
                        value={productDetails.id || order.product_id}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Talla
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="size"
                        id="size"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.size}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.name}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Apellido
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.lastName}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Correo electrónico
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.email}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Telefóno
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.phone}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Dirección
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="direction_1"
                        id="direction_1"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.direction_1}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Dirección (opcional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="direction_2"
                        id="direction_2"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.direction_2}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Ciudad
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.city}
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Codigo postal
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autoComplete="postal_code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                        value={order.postal_code}
                        required
                      />
                    </div>
                  </div>
                  <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Precio total
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
  type="number"
  name="price_total"
  id="price_total"
  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  placeholder="0.00"
  onChange={handleChange}
  value={typeof order.price_total === 'number' ? order.price_total.toFixed(2) : ''}
  disabled
/>



                </div>
                <div><strong>+ €{productDetails.price_send} costo de envió a través de correos <img className={styles.correo} src={require('../../Images/Icono-payment/Correos-envio.jpg')} alt="" /> </strong></div>



              </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className={`text-sm font-medium text-gray-900 `}>
                METODOS DE PAGO
              </h2>

              <div className="mt-4 space-y-6">
                <p className={`text-sm text-gray-600 `}>
                  {" "}
                  Una vez completado el formulario, primero realize la
                  transferencia y luego el boton de completar compra.
                </p>
                <div className={styles.payment}>
                  <div className={styles.logo_payment}>
                    <a
                      href="https://www.paypal.com/paypalme/VipMonNoal"
                      target="__blanck"
                    >
                      <img
                        src={require("../../Images/Icono-payment/Paypal.png")}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className={styles.logo_payment}>
                    <img
                      src={require("../../Images/Icono-payment/Bizum1.png")}
                      alt=""
                    />
                    <a>+34 670 862 817</a>
                  </div>

                  <div className={styles.logo_payment}>
                    <img
                      src={require("../../Images/Icono-payment/caja.png")}
                      alt=""
                    />
                    <a>ES3821030157090010025387</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                onClick={handleCloseOrder}
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red" },
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ffc400",
                  ":hover": { backgroundColor: "#ffc400" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Completar la compra"
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/">
              <img
                src={require("../../Images/Logo/Logo.png")}
                alt="Logo"
                className={styles.logo}
              />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <IconButton aria-label="cart" onClick={handleOpenCart}>
            <StyledBadge
              badgeContent={cartItems ? cartItems.length : 0}
              color="secondary"
            >
              <ShoppingCartIcon sx={{ color: "#ffc400" }} />
            </StyledBadge>
          </IconButton>
            <Link to="/">
              <Button sx={{ color: "#ffc400" }}>Inicio</Button>
            </Link>
            <Link to="/catalogo">
              <Button sx={{ color: "#ffc400" }}>catologo</Button>
            </Link>
            <Link to="/contacto">
              <Button sx={{ color: "#ffc400" }}>Contácto</Button>
            </Link>
          </Box>
          <div className={styles.cart_shopping}>

          <IconButton  aria-label="cart" onClick={handleOpenCart}>
            <StyledBadge
              badgeContent={cartItems ? cartItems.length : 0}
              color="secondary"
              >
              <ShoppingCartIcon sx={{ color: "#ffc400" }} />
            </StyledBadge>
          </IconButton>
              </div>
          {datapersonal && datapersonal.role === "user" ? (
            <div className={styles.btn_login}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  backgroundColor: datapersonal && datapersonal.backgroundColor,
                }}
                onClick={handleClick}
              >
                {datapersonal && datapersonal.name[0].toUpperCase()}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/perfil">
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className={styles.btn_login}>
              <Link to="/auth/login">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                  }}
                ></Avatar>
              </Link>
            </div>
          )}

       
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#000",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

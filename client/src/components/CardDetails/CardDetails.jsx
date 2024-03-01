import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import styles from "./CardDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ProductDetail, Order, PaymentPaypal } from "../../redux/action";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from 'axios'; // Importa la biblioteca Axios
import { Image } from 'antd';
import Modal from "@mui/material/Modal";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
const style = {
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
const products = { id: 1, name: "Producto 1", price: 10 };
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
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CardDetails({ addToCart }) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState([]);

  const productDetails = useSelector((state) => state.productDetails);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    product_id: "",
    product: "",
    price_total: "",
    oneSize: "",
    size: [],
    name: "",
    lastName: "",
    email: "",

    phone: "",

    direction_1: "",
    direction_2: "",
    city: "",
    postal_code: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    const totalPrice = parseFloat(productDetails.price) + parseFloat(productDetails.price_send);
    setOrder((prevOrder) => ({
      ...prevOrder,
      product: productDetails.product,
      product_id: productDetails.id,
      price_total: totalPrice,
    }));
  };
  
  const handleClose = () => setOpen(false);
  useEffect(() => {
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
    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
      product: productDetails.product,
      product_id: productDetails.id,
    }));
  };

  const handleSize = (size) => {
    setSelectedSize(size);
    setOrder({
      ...order,
      oneSize: size,
    });
  };
  
  const sendToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3001/cart', order); // Envía los detalles del pedido al servidor
      console.log('Producto agregado al carrito:', response.data);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
  
  return (
    <div className={`bg-black ${styles.details_container}`}>
      <div className="pt-6">
        {/* Image gallery */}
        <div className={`mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 ${styles.image_container}`}>
          {productDetails.imageFile && productDetails.imageFile.map((data) => (

            <div
            className={`aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block ${styles.img_Details}`}
            >
            <Image
              src={data}
              alt={data}
              className="w-full object-cover object-center"
              />
          </div>
              ))}
        </div>

   
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1
              className={`text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl ${styles.text}`}
            >
              {productDetails.product}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p
              className={`text-3xl tracking-tight text-gray-900 ${styles.text}`}
            >
              €{productDetails.price}
            </p>

            <div className="mt-10">
              {/* Colors */}

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className={`text-sm font-medium text-indigo-600 hover:text-indigo-500 ${styles.text}`}
                  >
                    Tallas disponible
                  </a>
                </div>

                <RadioGroup className={`mt-4 `}>
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productDetails.size &&
                      productDetails.size.map((size, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={size}
                          onClick={() => handleSize(size)}
                          className={classNames(
                            ` group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 ${styles.sizes}`
                          )}
                        >
                          <>
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                            <span
                              className={classNames(
                                "pointer-events-none absolute -inset-px rounded-md"
                              )}
                              aria-hidden="true"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            ></span>
                          </>
                        </RadioGroup.Option>
                      ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${styles.btn_order}`}
                onClick={handleOpen}
              >
                COMPRAR
              </button>
              <button
                type="submit"
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${styles.btn_order}`}
                onClick={() =>
                  addToCart({ ...productDetails, size: selectedSize })
                }
              >
                Agregar al Carrito
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className={`text-base text-gray-900 ${styles.text}`}>
                  {productDetails.details}
                </p>
              </div>
            </div>


            <div className="mt-10">
              <h2
                className={`text-sm font-medium text-gray-900 ${styles.text}`}
              >
                METODOS DE PAGO
              </h2>

              <div className="mt-4 space-y-6">
                <p className={`text-sm text-gray-600 ${styles.text}`}>
                  {" "}
                  Para PayPal te dirige solo al enlace, para bizum y cuenta
                  bancaria póngase en contacto a través de WhatsApp gracias.
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
          </div>
        </div>
      </div>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                        value={order.oneSize}
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
                onClick={handleClose}
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
    </div>
  );
}

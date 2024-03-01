// Función para agregar un producto al carrito en el localStorage
export const addToCart = (product) => {
    const cart = getCart();
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Función para eliminar un producto del carrito en el localStorage
export const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Función para obtener los productos del carrito del localStorage
export const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

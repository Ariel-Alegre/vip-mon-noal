import axios from 'axios'







 export const register = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://vipmon-production.up.railway.app/register', userData);

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error(error);

      // Aquí podrías despachar una acción indicando que el registro falló
      dispatch({ type: 'REGISTER_FAILURE', payload: error });

      throw error; // Puedes lanzar el error para que el componente también lo maneje si es necesario
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("https://vipmon-production.up.railway.app/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
            role: response.data.role,
          },
        });

        return true; // Autenticación exitosa
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      return false; // Autenticación fallida
    }
  };
};


// actions/authActions.js

export const logout = () => {
return {
  type: 'LOGOUT',
};
};


export const dataPersonal = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://vipmon-production.up.railway.app/datapersonal",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return dispatch({
        type: "DATA_PERSONAL",
        payload: data,
      });
    } catch (error) {
      console.error('Error no existe el token:', error);
    }
  };
};

export const postProduct = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('https://vipmon-production.up.railway.app/post', payload);
      const data = res.data;

      dispatch({
        type: "POST_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const deleteProduct= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`https://vipmon-production.up.railway.app/delete/${productId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};

export const AllProducts = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('https://vipmon-production.up.railway.app/products', payload);
      const data = res.data;

      dispatch({
        type: "ALL_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las publicaciónes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const AllUsers= (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('https://vipmon-production.up.railway.app/users', payload);
      const data = res.data;

      dispatch({
        type: "ALL_USERS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las publicaciónes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};


export const ProductDetail= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://vipmon-production.up.railway.app/product/${productId}`);
      const data = res.data;

      dispatch({
        type: "PRODUCT_DETAILS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los detalles:', error);
    }
  };
};

export const PaymentPaypal= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`https://vipmon-production.up.railway.app/create-payment/${productId}`);
      const data = res.data;
window.location.href = data.links[1].href
      dispatch({
        type: "PAYMENT_PAYPAL",
        payload: data
      });
    } catch (error) {
      console.error('Error al al pagar on paypal:', error);
    }
  };
};

export const Order= (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`https://vipmon-production.up.railway.app/order`, payload);
      const data = res.data;
      dispatch({
        type: "ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };
};

export const AllOrder= () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://vipmon-production.up.railway.app/orders`);
      const data = res.data;
      dispatch({
        type: "ALL_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar todas las ordenes:', error);
    }
  };
};

export const OneOrder= (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`https://vipmon-production.up.railway.app/order/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DETAILS_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};
export const deleteOrder= (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`https://vipmon-production.up.railway.app/order/delete/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al borrar la orden:', error);
    }
  };
}; 


export const updateProduct= (productId, payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`https://vipmon-production.up.railway.app/productupdate/${productId}`, payload);
      const data = res.data;
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
    }
  };
}; 








/* export const register = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/register', userData);

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error(error);

      // Aquí podrías despachar una acción indicando que el registro falló
      dispatch({ type: 'REGISTER_FAILURE', payload: error });

      throw error; // Puedes lanzar el error para que el componente también lo maneje si es necesario
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
            role: response.data.role,
          },
        });

        return true; // Autenticación exitosa
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      return false; // Autenticación fallida
    }
  };
};


// actions/authActions.js

export const logout = () => {
return {
  type: 'LOGOUT',
};
};


export const dataPersonal = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/datapersonal",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return dispatch({
        type: "DATA_PERSONAL",
        payload: data,
      });
    } catch (error) {
      console.error('Error no existe el token:', error);
    }
  };
};

export const postProduct = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/post', payload);
      const data = res.data;

      dispatch({
        type: "POST_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const deleteProduct= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:3001/delete/${productId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};

export const AllProducts = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/products', payload);
      const data = res.data;

      dispatch({
        type: "ALL_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las publicaciónes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const AllUsers= (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/users', payload);
      const data = res.data;

      dispatch({
        type: "ALL_USERS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las publicaciónes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};


export const ProductDetail= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/product/${productId}`);
      const data = res.data;

      dispatch({
        type: "PRODUCT_DETAILS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los detalles:', error);
    }
  };
};

export const PaymentPaypal= (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/create-payment/${productId}`);
      const data = res.data;
window.location.href = data.links[1].href
      dispatch({
        type: "PAYMENT_PAYPAL",
        payload: data
      });
    } catch (error) {
      console.error('Error al al pagar on paypal:', error);
    }
  };
};

export const Order= (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/order`, payload);
      const data = res.data;
      dispatch({
        type: "ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };
};

export const AllOrder= () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/orders`);
      const data = res.data;
      dispatch({
        type: "ALL_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar todas las ordenes:', error);
    }
  };
};

export const OneOrder= (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/order/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DETAILS_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};
export const deleteOrder= (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:3001/order/delete/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al borrar la orden:', error);
    }
  };
}; 


export const updateProduct= (productId, payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/productupdate/${productId}`, payload);
      const data = res.data;
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
    }
  };
};   */
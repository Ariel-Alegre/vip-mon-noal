import React, { useState, useEffect } from "react";
import styles from "./LorginForm.module.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { login } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const role = useSelector((state) => state.role);
  const [loading, setLoading] = useState(false);
  const error = () => {
    messageApi.open({
      type: "error",
      content: "el correo y/o la contraseña no coinciden",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el indicador de carga
  
    try {
        const authResult = await dispatch(login(email, password));
        setAuth(authResult);
      if (authResult) {
        setAuth(authResult);
        
      } else {
        error() 
      }

    } catch (error) {
      console.error('Error durante el inicio de sesión', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (auth) {
      if (role === 'user') {
        navigate('/');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    }
  }, [auth, role]);
  

  return (
    <div className='bg-black h-screen flex justify-center items-center'>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
          className={styles.logo}
            src={require('../../Images/Logo/Logo.png')}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Iniciar sesión en su cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
             
                  className= {styles.input}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Contraseña
                </label>
           {/*      <div className="text-sm">
                  <a href="#" style={{color: "#ffc400"}} >
                    Olvidaste tu contraseña?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className= {styles.input}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            sx={{
              background: "#ffc400",
              color: '#fff',
              ":hover": {
                background: "#ffc400"
              }
            }}
            
            >
                   {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
                
              </Button>
            </div>
          {contextHolder}

          </form>

          <p className="mt-10 text-center text-sm text-white">
            no estas registrado?{' '}
            <Link to='/auth/register' style={{color: "#ffc400"}} >
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

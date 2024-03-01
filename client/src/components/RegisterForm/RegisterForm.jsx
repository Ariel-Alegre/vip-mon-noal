import Button from "@mui/material/Button";
import { message } from "antd";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import styles from "./RegisterForm.module.css";
import { register, AllUsers } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RegisterForm() {
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const registrationSuccess = useSelector((state) => state.registrationSuccess);
  const registrationError = useSelector((state) => state.registrationError);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(register(data));

      // Por ejemplo, redirigir al usuario a otra página
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false); 
    }

  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "El usuario ya existe",
    });
  };
  useEffect(() => {
 
    if (registrationError) {
      error();
    }
  }, [registrationSuccess, registrationError]);

  return (
    <div className="isolate bg-black px-6 py-24 sm:py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className={styles.logo}
          src={require("../../Images/Logo/Logo.png")}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Registrarse
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="none"
                required
                className={styles.input}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Apellido
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="none"
                className={styles.input}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Correo electrónico
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="new-email"
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Contraseña
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                className={styles.input}
                autoComplete="off"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-white"
            >
              Numero de telefóno
            </label>
            <div className="relative mt-2.5">
              <input
                type="tel"
                name="phone"
                id="phone"
                className={styles.input}
                autoComplete="none"
                required
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
          </div>

          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-yellow-500" : "bg-blue-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only text-white">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-white">
              Acepta nuestra{" "}
              <a href="#" className="font-semibold text-yellow-500">
                politica&nbsp;privacidad
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <Button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            sx={{
              background: "#ffc400",
              color: "#fff",
              ":hover": {
                background: "#ffc400",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Registrarse"
            )}
          </Button>
          {contextHolder}
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logoImg from "../../assets/img/fc_logo.png";
import CustomInputComponent from "../../components/Input";
import authService from "../../services/auth.service";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const notify = (message) => {
    toast(message);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    authService
      .login(authData)
      .then((res) => {
        socket.emit("new-user", {username: res.data.user.username, socketId: socket.id})
        navigate("/");
      })
      .catch((err) => {
        console.log("Login--Err-->>>", err.data);
        notify(err.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChange = (payload) => {
    setAuthData({ ...authData, ...payload });
  };
  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logoImg}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <CustomInputComponent
              name="email"
              type="email"
              placeholder="Email eingeben"
              required={true}
              // errors={errors}
              onChange={onChange}
              label={
                <label
                  htmlFor="email"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              }
              icon={
                <EnvelopeIcon
                  className="block h-5 w-5 font-bold focus:text-form-color"
                  aria-hidden="true"
                />
              }
            />

            <CustomInputComponent
              name="password"
              type="password"
              placeholder="Passwort eingeben"
              required={true}
              // errors={errors}
              onChange={onChange}
              icon={
                <LockClosedIcon
                  className="block h-5 w-5 font-bold focus:text-form-color"
                  aria-hidden="true"
                />
              }
              label={
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Passwort
                  </label>
                  <div className="text-sm">
                    <Link
                      to="#"
                      className="font-semibold text-green-600 hover:text-green-500"
                    >
                      Passwort vergessen?
                    </Link>
                  </div>
                </div>
              }
            />

            <ToastContainer />

            <div>
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <button
                  type="submit"
                  className="flex justify-center justify-center bg-green-600 text-base font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:text-white/70 w-full px-3 py-1.5 rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

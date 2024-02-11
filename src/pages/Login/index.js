import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/img/fc_logo.png";
import CustomInputComponent from "../../components/Input";
import authService from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .login(authData)
      .then((res) => navigate('/'))
      .catch((err) => console.log("Login--Err-->>>", err.data));
  };

  const onChange = (payload) => {
    setAuthData({...authData, ...payload});
  }
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

            <div>
              <button
                type="submit"
                className="flex justify-center justify-center bg-green-600 text-base font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:text-white/70 w-full px-3 py-1.5 rounded-md"
              >
                Login
              </button>
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

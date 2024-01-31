import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import logoImg from "../../assets/img/fc_logo.png";

const Login = () => {
  const [showPsd, setShowPsd] = useState(false);
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
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-left font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="relative mt-2">
                <span className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
                  <EnvelopeIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email eingeben"
                  required
                  className="w-full py-2 text-sm text-gray-900 border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-gray-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="relative mt-2">
                <span className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
                  <LockClosedIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPsd ? "type" : "password"}
                  autoComplete="current-password"
                  placeholder="Passwort eingeben"
                  required
                  className="w-full py-2 text-sm text-gray-900 border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-gray-900"
                />
                <span
                  className="absolute text-gray-500 inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={() => setShowPsd(!showPsd)}
                >
                  <EyeIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

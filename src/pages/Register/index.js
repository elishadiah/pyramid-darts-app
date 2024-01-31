import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/img/fc_logo.png";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const Register = () => {
  const [showPsd, setShowPsd] = useState(false);
  const [showPsd2, setShowPsd2] = useState(false);
  return (
    <>
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-indigo-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src={logoImg}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="user"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Nutzername
                </label>
                <div className="relative mt-2">
                  <span className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
                    <UserIcon
                      className="block h-5 w-5 font-bold focus:text-form-color"
                      aria-hidden="true"
                    />
                  </span>
                  <input
                    id="user"
                    name="user"
                    type="text"
                    autoComplete="user"
                    placeholder="Nutzername eingeben"
                    required
                    className="w-full py-2 text-sm text-gray-900 border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  E-Mail-Adresse
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
                <label
                  htmlFor="password"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Passwort
                </label>
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
                <label
                  htmlFor="password confirm"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Passwortbestätigung
                </label>
                <div className="relative mt-2">
                  <span className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
                    <LockClosedIcon
                      className="block h-5 w-5 font-bold focus:text-form-color"
                      aria-hidden="true"
                    />
                  </span>
                  <input
                    id="password confirm"
                    name="password confirm"
                    type={showPsd2 ? "type" : "password"}
                    autoComplete="current-password-confirm"
                    placeholder="Passwortbestätigung eingeben"
                    required
                    className="w-full py-2 text-sm text-gray-900 border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-gray-900"
                  />
                  <span
                    className="absolute text-gray-500 inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                    onClick={() => setShowPsd2(!showPsd2)}
                  >
                    <EyeIcon
                      className="block h-5 w-5 font-bold focus:text-form-color"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              <div>
                {/* <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                > */}
                <Link
                  to="/"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </Link>
                {/* </button> */}
              </div>
            </form>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
    </>
  );
};

export default Register;

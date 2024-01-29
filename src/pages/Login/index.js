import { useState } from "react";
import { Link } from "react-router-dom";
import BottomBar from "../../components/BottomBar";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const Login = () => {
  const [showPsd, setShowPsd] = useState(false);
  return (
    <>
      <div className="w-6/12 m-auto mt-12 text-white">
        <h2 className="text-left text-2xl font-semibold">Login</h2>
        <h5 className="text-left font-normal mt-2 mb-8">
          Einloggen und alle Features nutzen
        </h5>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-bold leading-6"
            >
              Email
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
                className="w-full py-2 text-sm text-white bg-main-bg-color border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-white"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-left text-sm font-bold leading-6"
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
                className="w-full py-2 text-sm text-white bg-main-bg-color border border-gray-500 rounded-md pl-10 focus:outline-none focus:border-none focus:ring-2 focus:ring-form-color focus:text-white"
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
              className="flex w-full justify-center rounded-md bg-form-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
            <p className="text-gray-400 mt-2 mb-2">oder</p>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-form-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Account erstellen
            </button>
          </div>
        </form>
        <div className="text-sm leading-6 mt-6">
          <Link
            to="#"
            className="font-semibold text-sky-500 hover:text-sky-400"
          >
            Passwort vergessen
          </Link>
        </div>
      </div>
      <BottomBar pageNo={5} />
    </>
  );
};

export default Login;

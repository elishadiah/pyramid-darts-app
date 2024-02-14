import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/img/fc_logo.png";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import CustomInputComponent from "../../components/Input";
import authService from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .register(authData)
      .then((res) => navigate('/login'))
      .catch((err) => console.log("Register--Err-->>>", err.data));
  };

  const onChange = (payload) => {
    setAuthData({ ...authData, ...payload });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-indigo-100 pb-40">
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <CustomInputComponent
                name="username"
                type="text"
                placeholder="Nutzername eingeben"
                // errors={errors}
                onChange={onChange}
                label={
                  <label
                    htmlFor="user"
                    className="block text-sm text-left font-medium leading-6 text-gray-900"
                  >
                    Nutzername
                  </label>
                }
                icon={
                  <UserIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                }
              />
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
                    E-Mail-Adresse
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
                placeholder="Passwort eigeben"
                // errors={errors}
                onChange={onChange}
                label={
                  <label
                    htmlFor="password"
                    className="block text-sm text-left font-medium leading-6 text-gray-900"
                  >
                    Passwort
                  </label>
                }
                icon={
                  <LockClosedIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                }
              />
              <CustomInputComponent
                name="password-confirm"
                type="password"
                placeholder="Passwort eingeben"
                // errors={errors}
                onChange={onChange}
                label={
                  <label
                    htmlFor="password confirm"
                    className="block text-sm text-left font-medium leading-6 text-gray-900"
                  >
                    Passwortbestätigung
                  </label>
                }
                icon={
                  <LockClosedIcon
                    className="block h-5 w-5 font-bold focus:text-form-color"
                    aria-hidden="true"
                  />
                }
              />

              <div>
                <button
                  type="submit"
                  className="flex justify-center justify-center bg-green-600 text-base font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:text-white/70 w-full px-3 py-1.5 rounded-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

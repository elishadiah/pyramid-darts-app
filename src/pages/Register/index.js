import { Link } from "react-router-dom";
import logoImg from "../../assets/img/fc_logo.png";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import CustomInputComponent from "../../components/Input";
import { Button } from "../../components/Button";

const Register = () => {
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
            <form className="space-y-6" action="#" method="POST">
              <CustomInputComponent
                name="user"
                type="text"
                placeholder="Nutzername eingeben"
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
                <Button className="flex w-full px-3 py-1.5 rounded-md" to="/">
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

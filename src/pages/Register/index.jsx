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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../helper/http-client";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    avatar: null,
  });

  const notify = (message) => {
    toast(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authData.password !== authData.password2) {
      notify("Passwords must match!");
      return;
    }
    console.log("Register--test-->>", authData);
    setIsLoading(true);
    authService
      .register(authData)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Register--Err-->>>", err.data);
        notify(err.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAvatarUpload = async (e) => {
    setIsAvatarLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      const res = await http.post("/avatar/upload", formData);
      setAuthData({ ...authData, avatar: res.data.url });
    } catch (err) {
      console.log("Avatar-err-->>", err);
      notify(err);
    } finally {
      setIsAvatarLoading(false);
    }
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
              {isAvatarLoading ? (
                <div className="col-span-full flex items-center justify-center gap-x-8">
                  <div
                    className="inline-block h-8 w-8 animate-spin text-green-600 dark:text-white rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="col-span-full flex items-center gap-x-8">
                  {authData.avatar === null ? (
                    <img
                      src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg dark:bg-gray-800 object-cover"
                    />
                  ) : (
                    <img
                      src={authData.avatar}
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg dark:bg-gray-800 object-cover"
                    />
                  )}
                  <div>
                    <label
                      htmlFor="avatar-upload"
                      className="rounded-md bg-green-600 text-white cursor-pointer px-3 py-1.5 hover:bg-green-500"
                    >
                      Avatar ändern
                      <input
                        type="file"
                        name="avatar-upload"
                        id="avatar-upload"
                        className="hidden"
                        accept=".png, .jpb, .jpeg"
                        onChange={handleAvatarUpload}
                      />
                    </label>

                    <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
              )}

              <CustomInputComponent
                name="username"
                type="text"
                placeholder="Nutzername eingeben"
                required={true}
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
                required={true}
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
                required={true}
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
                name="password2"
                type="password"
                placeholder="Passwort eingeben"
                required={true}
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
                    Register
                  </button>
                )}
              </div>
              <ToastContainer />
            </form>
            <div className="font-normal text-md text-gray-900 dark:text-white">
              Already have an account?{" "}
              <span
                className="text-green-700 font-semibold cursor-pointer select-none hover:underline"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

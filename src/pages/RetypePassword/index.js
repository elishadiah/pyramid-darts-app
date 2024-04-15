import { useState } from "react";
import CustomInputComponent from "../../components/Input";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import logoImg from "../../assets/img/fc_logo.png";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../utility/http-client";
import Loading from "../../components/Loading";

const RetypePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({ password: "", password2: "" });
  const onChange = (payload) => {
    setPassword({ ...password, ...payload });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.password2) {
      toast("Passwords must match!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await http.post(`/auth/retype-password`, {
        password: password.password,
        userId: id,
        token: token
      });
      toast(res.data);
      navigate("/login");
    } catch (err) {
      toast(err.data);
    } finally {
      setIsLoading(false);
    }
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
            Reset your account password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                <label
                  htmlFor="email"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Passwort
                </label>
              }
            />
            <CustomInputComponent
              name="password2"
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
                <label
                  htmlFor="email"
                  className="block text-sm text-left font-medium leading-6 text-gray-900"
                >
                  Passwortbestätigung
                </label>
              }
            />
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  className="flex justify-center justify-center bg-green-600 text-base font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:text-white/70 w-full px-3 py-1.5 rounded-md"
                >
                  Reset Password
                </button>
              )}
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default RetypePassword;

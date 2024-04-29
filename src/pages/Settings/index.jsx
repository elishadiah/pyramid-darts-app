import Header from "../../components/Header";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import CustomInputComponent from "../../components/Input";
import { Button } from "../../components/Button";
import http from "../../helper/http-client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/auth.service";
import DiscordIcon from "../../components/Icons/DiscordIcon";
import FacebookIcon from "../../components/Icons/FacebookIcon";
import InstagramIcon from "../../components/Icons/InstagramIcon";
import TwitterIcon from "../../components/Icons/TwitterIcon";

const Settings = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });
  const [pwdInfo, setPwdInfo] = useState({});

  const notify = (message) => {
    toast(message);
  };

  useEffect(() => {
    const tmp = authService.getAuthUser().user;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      setUserAvatar(null);
    else setUserAvatar(tmp.avatar);
    setUser(authService.getAuthUser().user);
  }, []);

  const handleAvatarUpload = async (e) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      const res = await http.post("/avatar/upload", formData);
      setUserAvatar(res.data.url);
    } catch (err) {
      console.log("Avatar-err-->>", err);
      notify(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await http.post(`/auth/update/${user._id}`, {
        ...user,
        avatar: userAvatar,
      });
      const oldUser = authService.getAuthUser();
      const newUser = {
        token: oldUser.token,
        user: { ...oldUser.user, ...res.data.data.updatedUser },
      };
      localStorage.removeItem("authUser");
      localStorage.setItem("authUser", JSON.stringify(newUser));
      notify("Success!");
    } catch (err) {
      console.log("Update-err-->>", err);
      notify("Error!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (pwdInfo.newpassword !== pwdInfo.confirmpassword)
      return toast.warning("New password and confirm password must match!");
    try {
      const res = await http.post(
        `/auth/change-password/${authService.getAuthUser().user._id}`,
        {
          currentPassword: pwdInfo.currentpassword,
          newPassword: pwdInfo.newpassword,
        }
      );
      notify(res.data);
    } catch (err) {
      notify("Failed Password change");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, ...e });
  };

  const onChangePwd = (e) => {
    setPwdInfo({ ...pwdInfo, ...e });
  };

  return (
    <div className="relative sm:pb-24 bg-green-50 text-gray-900 dark:text-white dark:bg-gray-800">
      <Header current={0} />
      <div>
        <div className="divide-y divide-white/5">
          <div className="grid m-auto max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Persönliche Angaben
              </h2>
              <div className="py-4 flex items-center justify-center gap-4 md:mt-16">
                <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                  <DiscordIcon />
                </div>
                <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                  <FacebookIcon />
                </div>
                <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                  <InstagramIcon />
                </div>
                <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                  <TwitterIcon />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <form encType="multipart/form-data">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  {isLoading ? (
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
                      {userAvatar === null ? (
                        <img
                          src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                          alt=""
                          className="h-24 w-24 flex-none rounded-lg dark:bg-gray-800 object-cover"
                        />
                      ) : (
                        <img
                          src={userAvatar}
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
                </div>
              </form>

              <form onSubmit={handleUserInfo}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <CustomInputComponent
                      name="firstname"
                      type="text"
                      placeholder="Vorname eingeben"
                      required={true}
                      value={user.firstname}
                      onChange={onChange}
                      label={
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Vornane
                        </label>
                      }
                      icon={
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      }
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomInputComponent
                      name="lastname"
                      type="text"
                      placeholder="Familienname eingeben"
                      required={true}
                      value={user.lastname}
                      onChange={onChange}
                      label={
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Familienname
                        </label>
                      }
                      icon={
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      }
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomInputComponent
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required={true}
                      value={user.email}
                      onChange={onChange}
                      label={
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                      }
                      icon={
                        <EnvelopeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      }
                    />
                  </div>

                  <div className="col-span-full">
                    <CustomInputComponent
                      name="username"
                      type="text"
                      placeholder="Nutzername eingeben"
                      required={true}
                      value={user.username?.toLowerCase()}
                      onChange={onChange}
                      label={
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Nutzername
                        </label>
                      }
                      icon={
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      }
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center md:justify-start">
                  <Button
                    type="submit"
                    className="rounded-md py-2 px-3 text-sm font-semibold shadow-sm"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="grid max-w-7xl m-auto grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Kennwort ändern
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Aktualisieren Sie Ihr mit Ihrem Konto verknüpftes Passwort.
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={handleChangePassword}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <CustomInputComponent
                    name="currentpassword"
                    type="password"
                    placeholder="Geben Sie Ihr altes Passwort ein"
                    required={true}
                    onChange={onChangePwd}
                    label={
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Aktuelles Passwort
                      </label>
                    }
                    icon={
                      <LockClosedIcon
                        className="block h-5 w-5 font-bold focus:text-form-color"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>

                <div className="col-span-full">
                  <CustomInputComponent
                    name="newpassword"
                    type="password"
                    placeholder="Bitte geben Sie Ihr neues Passwort ein"
                    required={true}
                    onChange={onChangePwd}
                    label={
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Neues Kennwort
                      </label>
                    }
                    icon={
                      <LockClosedIcon
                        className="block h-5 w-5 font-bold focus:text-form-color"
                        aria-hidden="true"
                      />
                    }
                  />
                </div>

                <div className="col-span-full">
                  <CustomInputComponent
                    name="confirmpassword"
                    type="password"
                    placeholder="Bitte geben Sie Ihr neues Passwort ein"
                    required={true}
                    onChange={onChangePwd}
                    label={
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
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
                </div>
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  type="submit"
                  className="rounded-md py-2 px-3 text-sm font-semibold shadow-sm"
                >
                  Save
                </Button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

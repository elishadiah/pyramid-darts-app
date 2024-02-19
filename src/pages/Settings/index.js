import Header from "../../components/Header";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import CustomInputComponent from "../../components/Input";
import { Button } from "../../components/Button";
import http from "../../utility/http-client";
import { useEffect, useState } from "react";

const Settings = ({socket}) => {
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem("authUser")).user;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      setUserAvatar(null);
    else setUserAvatar(tmp.avatar);

    setUserid(JSON.parse(localStorage.getItem("authUser")).user._id);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await http.post(`/auth/update/${userid}`, {
        ...user,
        avatar: userAvatar,
      });
      const oldUser = JSON.parse(localStorage.getItem("authUser"));
      console.log('TTT---------------', oldUser)
      const newUser = {
        token: oldUser.token,
        user: { ...oldUser.user, ...res.data.data.updatedUser },
      };
      localStorage.removeItem("authUser");
      localStorage.setItem("authUser", JSON.stringify(newUser));
      console.log("Update-res-->>>", res.data.data.updatedUser);
    } catch (err) {
      console.log("Update-err-->>", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, ...e });
    console.log("Setting-tes-->>", user);
  };

  return (
    <div className="relative sm:pb-24 bg-green-50 text-gray-900 dark:text-white dark:bg-gray-800">
      <Header current={0} socket={socket} />
      <div>
        <div className="divide-y divide-white/5">
          <div className="grid m-auto max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Persönliche Angaben
              </h2>
              {/* <p className="mt-1 text-sm leading-6 text-gray-400">
              </p> */}
            </div>

            <form className="md:col-span-2" encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                {isLoading ? (
                  <div className="col-span-full flex items-center justify-center gap-x-8">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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

                <div className="sm:col-span-3">
                  <CustomInputComponent
                    name="first-name"
                    type="text"
                    placeholder="Vorname eingeben"
                    required={true}
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
                    name="last-name"
                    type="text"
                    placeholder="Familienname eingeben"
                    required={true}
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

              <div className="mt-8 flex">
                <Button
                  type="submit"
                  className="rounded-md py-2 px-3 text-sm font-semibold shadow-sm"
                  onClick={handleUserInfo}
                >
                  Save
                </Button>
              </div>
            </form>
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

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <CustomInputComponent
                    name="current-password"
                    type="password"
                    placeholder="Passwort eigeben"
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
                    name="new-password"
                    type="password"
                    placeholder="Passwort eigeben"
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
                    name="confirm-password"
                    type="password"
                    placeholder="Passwort eigeben"
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

              <div className="mt-8 flex">
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
      </div>
    </div>
  );
};

export default Settings;

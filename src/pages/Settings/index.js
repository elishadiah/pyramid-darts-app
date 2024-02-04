import Header from "../../components/Header";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import CustomInputComponent from "../../components/Input";
import { Button } from "../../components/Button";

const Settings = () => {
  return (
    <div className="relative sm:pb-24 bg-green-50 text-gray-900 dark:text-white dark:bg-gray-800">
      <Header current={0} />
      <div>
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Persönliche Angaben
              </h2>
              {/* <p className="mt-1 text-sm leading-6 text-gray-400">
              </p> */}
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                    src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg dark:bg-gray-800 object-cover"
                  />
                  <div>
                    <Button className="rounded-md bg-gray-100 border border-gray-200 px-3 py-1.5">
                      Avatar ändern
                    </Button>
                    <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <CustomInputComponent
                    name="first-name"
                    type="text"
                    placeholder="Vorname eingeben"
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
                >
                  Save
                </Button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
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

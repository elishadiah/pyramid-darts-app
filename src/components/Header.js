import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, redirect } from "react-router-dom";
import Switcher from "./Switcher";
import logoImg from "../assets/img/fc_logo.png";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import http from "../utility/http-client";
import EmailNotify from "../utility/emailjs";

const navigation = [
  { name: "Home", to: "/", current: 1 },
  { name: "Pyramid", to: "/pyramid", current: 2 },
  { name: "Infos", to: "/infos", current: 3 },
  { name: "Profile", to: "/profile", current: 4 },
  { name: "Calendar", to: "/schedule", current: 5 },
];

const userMenuItems = [
  { name: "Your Profile", to: "/profile" },
  { name: "Settings", to: "/settings" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ current, socket }) {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [scheduleNotification, setScheduleNotification] = useState(null);

  const handleLogout = () => {
    authService.logout();
    redirect("/login");
  };

  const declineChallenge = (type) => {
    EmailNotify.sendNotificationEmail(
      user.username,
      user.email,
      type === "quick" ? notifications.username : scheduleNotification.username,
      type === "quick" ? notifications.email : scheduleNotification.email,
      `${user.username} declined your challenge.`,
      "Dart Challenge"
    );
  };

  const removeNotification = () => {
    setNotifications(null);
    declineChallenge("quick");
  };

  const removeScheduleNotification = () => {
    setScheduleNotification(null);
    declineChallenge("schedule");
  };

  const acceptScheduleNotification = async () => {
    try {
      http.post("/schedule/save", scheduleNotification);
    } catch (err) {
      console.log(err);
    } finally {
      setScheduleNotification(null);
    }
  };

  const acceptNotification = () => {
    window.open(`https://lidarts.org/`, "_blank");
    navigate("/result");
  };

  const getCurrentTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
  };

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem("authUser")).user;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      setUserAvatar(null);
    else setUserAvatar(tmp.avatar);
    setUser(tmp);
  }, []);

  useEffect(() => {
    socket.on("challengeResponse", (data) => {
      data.user === user?.username &&
        setNotifications({
          username: data.challenger,
          email: data.challengerEmail,
        });
      console.log("Socket-notification-->>>", notifications, "::::", data);
    });
  }, [socket, user, notifications]);

  useEffect(() => {
    socket.on("schedule-challenge-response", (data) => {
      data.user === user?.username &&
        setScheduleNotification({
          date: data.date,
          username: data.challenger,
          email: data.challengerEmail,
          receiver: data.user,
          receiverEmail: data.email,
        });
    });
  }, [socket, user, scheduleNotification]);

  return (
    <Disclosure
      as="nav"
      className="bg-indio-50 dark:bg-gray-800 mb-12 border border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex flex-shrink-0">
                  <img
                    className="h-10 w-auto"
                    src={logoImg}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current === current
                            ? "bg-gray-100 dark:bg-gray-900 dark:text-white"
                            : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.current === current ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  <Switcher />
                  {/* Bell notification */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm focus:outline-none ">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {(notifications || scheduleNotification) && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-700"></span>
                          </span>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {notifications && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                )}
                              >
                                <p className="mb-4">
                                  {notifications.username} hat Ihnen eine
                                  Herausforderung geschickt
                                </p>
                                <div className="flex gap-2 justify-center">
                                  <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                                    onClick={acceptNotification}
                                  >
                                    <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                                      Accept
                                    </p>
                                  </Disclosure.Button>
                                  <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                                    onClick={removeNotification}
                                  >
                                    <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                                      Decline
                                    </p>
                                  </Disclosure.Button>
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                        )}
                        {scheduleNotification && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                )}
                              >
                                <p className="mb-4">
                                  {scheduleNotification.username} hat Ihnen eine
                                  geplante Herausforderung gesendet.
                                </p>
                                <p>
                                  Wenn Sie zustimmen, können Sie das Spiel in
                                  den nächsten 8 Stunden nicht abbrechen, ohne
                                  zu verlieren.
                                </p>
                                <p>
                                  Challenge-Datum:{" "}
                                  {new Date(
                                    scheduleNotification.date
                                  ).toLocaleString("en-US", {
                                    timeZone: getCurrentTimeZone(),
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                  })}
                                </p>
                                <div className="flex gap-2 justify-center">
                                  <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                                    onClick={acceptScheduleNotification}
                                  >
                                    <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                                      Accept
                                    </p>
                                  </Disclosure.Button>
                                  <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                                    onClick={removeScheduleNotification}
                                  >
                                    <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                                      Decline
                                    </p>
                                  </Disclosure.Button>
                                </div>
                              </div>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {userAvatar === null ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                            alt=""
                          />
                        ) : (
                          <img
                            src={userAvatar}
                            alt=""
                            className="h-8 w-8 flex-none rounded-lg dark:bg-gray-800 object-cover"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userMenuItems.map((item, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <Link
                                to={item.to}
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-900" : "",
                                "block px-4 py-2 text-sm w-full text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.to}
                  className={classNames(
                    item.current === current
                      ? "text-gray-900 bg-gray-200 dark:bg-gray-900 dark:text-white"
                      : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-900 hover:text-gray-900 hover:dark:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current === current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current === current
                      ? "bg-gray-100 dark:bg-gray-900 dark:text-white"
                      : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current === current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {userAvatar === null ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                      alt=""
                    />
                  ) : (
                    <img
                      src={userAvatar}
                      alt=""
                      className="h-8 w-8 flex-none rounded-lg dark:bg-gray-800 object-cover"
                    />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-600 dark:text-white">
                    {user?.firstname + " " + user?.lastname}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <div className="relative ml-auto mr-2">
                  <Switcher />
                </div>
                <button
                  type="button"
                  className="relative rounded-full p-1 ml-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userMenuItems.map((item, index) => (
                  <Disclosure.Button
                    key={index}
                    as="a"
                    href={item.to}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-400 hover:bg-gray-200 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  onClick={handleLogout}
                  className="block rounded-md w-full px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-400 hover:bg-gray-200 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

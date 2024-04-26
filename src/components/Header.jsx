import { Fragment, useEffect, useState, useMemo } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, redirect } from "react-router-dom";
import Switcher from "./Switcher";
import logoImg from "../assets/img/fc_logo.png";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import http from "../helper/http-client";
import EmailNotify from "../helper/emailjs";
import socket from "../socket";
import constant from "../helper/constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ current }) {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [scheduleNotification, setScheduleNotification] = useState(null);
  const [users, setUsers] = useState([]);

  const selectedUser = useMemo(
    () => users.find((val) => val.userID === socket.userID),
    [users]
  );

  useEffect(() => {
    const tmp = authService.getAuthUser().user;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      setUserAvatar(null);
    else setUserAvatar(tmp.avatar);
    setUser(tmp);

    const sessionID = authService.getAuthUser().user._id;
    const username = authService.getAuthUser().user.username;
    if (sessionID) {
      socket.auth = { sessionID, username };
      socket.connect();
    }

    const handleErr = (err) => {
      console.log("Socket--err-->>", err);
    };

    const handleUserID = ({ userID }) => {
      socket.userID = userID;
    };

    socket.on("session_id", handleUserID);
    socket.on("connect_error", handleErr);

    return () => {
      socket.off("connect_error", handleErr);
      socket.off("session_id", handleUserID);
    };
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = true;
          user.status = "online";
        }
      });
      console.log("--connect");
    };

    const handleDisconnect = () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
          user.status = "offline";
        }
      });
      console.log("--disconnect");
    };

    const handleUsers = (receivedUsers) => {
      console.log("--users");
      receivedUsers.forEach((user) => {
        const existingUserIndex = users.findIndex(
          (existingUser) => existingUser.userID === user.userID
        );
        if (existingUserIndex !== -1) {
          setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[existingUserIndex].connected = user.connected;
            updatedUsers[existingUserIndex].status = user.status;
            updatedUsers[existingUserIndex].messages = user.messages;
            updatedUsers[existingUserIndex].hasNewMessages = false;
            return updatedUsers;
          });
        } else {
          user.self = user.userID === socket.userID;
          setUsers((prevUsers) => [...prevUsers, user]);
        }
      });
    };

    const handleUserConnected = (user) => {
      console.log("--user connected", users);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((existingUser) => {
          if (existingUser.userID === user.userID) {
            return { ...existingUser, connected: true, status: "online" };
          }
          return existingUser;
        });

        const newUser = prevUsers.find(
          (existingUser) => existingUser.userID === user.userID
        );
        if (!newUser) {
          updatedUsers.push({ ...user, hasNewMessages: false });
        }

        return updatedUsers;
      });
    };

    const handleUserDisconnected = (id) => {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user.userID === id) {
            return { ...user, connected: false, status: "offline" };
          }
          return user;
        });

        return updatedUsers;
      });
    };

    const handleChallenge = ({ content, from, to }) => {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        const userIndex = updatedUsers.findIndex(
          (user) => user.userID === (socket.userID === from ? to : from)
        );

        if (userIndex !== -1) {
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            messages: [
              ...updatedUsers[userIndex].messages,
              {
                content,
                fromSelf: socket.userID === from,
              },
            ],
            hasNewMessages: updatedUsers[userIndex] !== selectedUser,
          };
        }

        return updatedUsers;
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("users", handleUsers);
    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);
    socket.on("challenge", handleChallenge);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("users", handleUsers);
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
      socket.off("challenge", handleChallenge);
    };
  }, [socket, users]);

  const handleLogout = () => {
    authService.logout();
    redirect("/login");
  };

  const declineChallenge = (type) => {
    http.post("/event/post", {
      content: `${user.username} rejected a challenge`,
    });
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

  const handleBell = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.userID === socket.userID) {
          const updatedUser = {
            ...user,
            hasNewMessages: false,
          };
          return updatedUser;
        }
        return user;
      })
    );
    console.log(
      "-=-=-=-=-=-=->>>",
      selectedUser,
      "::::",
      users,
      ":::",
      socket.userID
    );
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 mb-12 border border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex flex-shrink-0">
                  <img
                    className="h-10 w-auto"
                    src={logoImg}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {constant.navigation.map((item) => (
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
              <div className="hidden lg:ml-6 lg:block">
                <div className="flex items-center">
                  <Switcher />
                  {/* Bell notification */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        onClick={handleBell}
                        className="relative flex rounded-full text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm focus:outline-none "
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {selectedUser?.hasNewMessages && (
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
                        {selectedUser?.messages?.length && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100 dark:bg-gray-900" : "",
                                  "block h-40 overflow-auto px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                )}
                              >
                                {selectedUser?.messages.map((item, index) => (
                                  <div key={index}>
                                    <p className="mb-4">
                                      {item.content}
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
                                ))}
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
                        {constant.userMenuItems.map((item, index) => (
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
              <div className="-mr-2 flex lg:hidden">
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

          <Disclosure.Panel className="lg:hidden">
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
              {constant.navigation.map((item) => (
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
                {constant.userMenuItems.map((item, index) => (
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
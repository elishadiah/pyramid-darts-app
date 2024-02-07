import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";
import logoImg from "../assets/img/fc_logo.png";

const navigation = [
  { name: "Home", to: "/", current: 1 },
  { name: "Rankings", to: "/ranking", current: 2 },
  { name: "Infos", to: "/infos", current: 3 },
  { name: "Schedule", to: "/schedule", current: 4 },
];

const userMenuItems = [
  { name: "Your Profile", to: "/profile" },
  { name: "Settings", to: "/settings" },
  { name: "Sign out", to: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ current }) {
  return (
    <Disclosure as="nav" className="bg-indio-50 dark:bg-gray-800 mb-12 border border-gray-200 dark:border-gray-700">
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
                  <button
                    type="button"
                    className="relative rounded-full p-1 ml-2 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:text-gray-900 hover:dark:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
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
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  to={item.to}
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
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-600 dark:text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    tom@example.com
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
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

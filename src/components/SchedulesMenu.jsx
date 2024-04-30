import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SchedulesMenu = ({ data }) => {
  console.log("Menu-->>", data);
  const createChallenge = () => {};
  const declineChallenge = () => {};
  return (
    <Disclosure
      as="nav"
      className="bg-indio-50 dark:bg-gray-800 mb-12 border border-gray-200 dark:border-gray-700"
    >
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm focus:outline-none ">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <p>Schedules</p>
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
            {data &&
              data.map((val) => (
                <Menu.Item key={val._id}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 dark:bg-gray-900" : "",
                        "block px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      )}
                    >
                      <p>
                        {val.challenger} : {val.receiver} - {val.date}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Disclosure.Button
                          className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                          onClick={createChallenge}
                        >
                          <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                            Create
                          </p>
                        </Disclosure.Button>
                        <Disclosure.Button
                          className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-green-500 hover:text-white focus:outline-none"
                          onClick={declineChallenge}
                        >
                          <p className="p-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500">
                            Decline
                          </p>
                        </Disclosure.Button>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </Disclosure>
  );
};

export default SchedulesMenu;

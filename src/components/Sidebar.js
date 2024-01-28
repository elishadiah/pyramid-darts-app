import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Sidebar(props) {
  const { open, setOpen } = props;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                  <div className="flex h-full flex-col overflow-hidden bg-main-bg-color py-6 shadow-xl">
                    {/* <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    <div className="px-4 sm:px-6 divide-y-2 divide-white">
                      {/* <img
                        src="blob:https://dartsfightclub.de/09baed9b-6406-4663-abe5-6c53c74a317d"
                        alt="logo-img"
                      /> */}
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <h3 className="text-white font-normal">Menu</h3>
                      <div className="flex flex-col mt-4">
                        <div className="flex p-4 items-center justify-between bg-divider-color rounded">
                          <Cog6ToothIcon
                            className="block h-6 w-6 text-white font-bold cursor-pointer"
                            aria-hidden="true"
                          />
                          <p className="text-white text-base font-normal">Einstellungen</p>
                          <ChevronRightIcon
                            className="block h-6 w-6 text-white font-bold cursor-pointer"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import { useState } from "react";
import { Bars3Icon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="p-4 flex h-16 items-center justify-between bg-main-color">
        <button type="button" onClick={() => setOpen(true)}>
          <Bars3Icon
            className="block h-6 w-6 text-black dark:text-white font-bold cursor-pointer"
            aria-hidden="true"
          />
        </button>
        <h1 className="text-xl text-white font-semibold truncate">
          Darts Fight Club
        </h1>
        <ArrowPathIcon
          className="block h-6 w-6 text-white font-bold cursor-pointer"
          aria-hidden="true"
        />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;

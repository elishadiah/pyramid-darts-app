import { useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { classNames } from "../helper/helper";

const CustomMultiSelect = ({
  isOpen,
  handleMenu,
  closeDropdown,
  selectedValue,
  children,
}) => {
  const node = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      closeDropdown();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  return (
    <div className="relative bg-white dark:bg-gray-800" ref={node}>
      <div
        className={classNames(
          "relative w-full py-2 px-4 text-left border border-green-400 dark:bg-gray-800 dark:border-gray-200 rounded-md cursor-pointer",
          selectedValue.length ? "h-fit" : "h-10"
        )}
        onClick={handleMenu}
      >
        {isOpen ? (
          <span className="absolute top-1/2 end-2 -translate-y-1/2">
            <ChevronUpIcon className="w-4 h-4 dark:text-white" />
          </span>
        ) : (
          <span className="absolute top-1/2 end-2 -translate-y-1/2">
            <ChevronDownIcon className="w-4 h-4 dark:text-white" />
          </span>
        )}
        {selectedValue.length ? (
          <div className="flex flex-wrap items-center gap-2">
            {selectedValue?.map((item, index) => (
              <div key={index} className="p-1 border rounded-md">
                {item?.label}
              </div>
            ))}
          </div>
        ) : (
          <span className="opacity-50 select-none">Select condition</span>
        )}
      </div>
      {isOpen && (
        <div
          className={classNames(
            "border absolute bg-white dark:bg-gray-800 top-full mt-2 z-10 p-4 bg-white w-full rounded-md"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;

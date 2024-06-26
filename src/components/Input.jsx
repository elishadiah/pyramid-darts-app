import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CustomInputComponent = ({
  name,
  icon,
  label,
  value,
  type,
  placeholder,
  disabled,
  required,
  errors,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value.trim() });
  };
  return (
    <div>
      {label}
      <div className="relative mt-2">
        <span className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-2">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          value={value}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onInputChange}
          className="block w-full rounded-md bg-white dark:bg-gray-800 dark:text-white border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-white/5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 focus-border-none focus-outline-none"
        />
        <div className="form-text text-danger">{errors && <p>{errors}</p>}</div>
        {type === "password" && (
          <span
            className="absolute text-gray-500 inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <EyeSlashIcon
                className="block h-5 w-5 font-bold focus:text-form-color"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                className="block h-5 w-5 font-bold focus:text-form-color"
                aria-hidden="true"
              />
            )}
          </span>
        )}
      </div>
      {/* {props.required && <div className="flex items-center text-gray-400 my-2 justify-end">Please fill out this field.</div>} */}
    </div>
  );
};

export default CustomInputComponent;

import { Link } from "react-router-dom";
import clsx from "clsx";

export function Button({ className, ...props }) {
  className = clsx(
    "inline-flex justify-center rounded-2xl bg-green-600 p-4 text-base font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:text-white/70",
    className
  );

  return typeof props.to === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}

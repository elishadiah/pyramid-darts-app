import {
  HomeIcon,
  InformationCircleIcon,
  UserIcon,
  UsersIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BottomBar = ({ pageNo }) => {
  const menuItems = [
    {
      link: "/",
      text: "Home",
      icon: (
        <HomeIcon
          className="block h-5 w-5 font-bold cursor-pointer"
          aria-hidden="true"
        />
      ),
    },
    {
      link: "#",
      text: "Rankings",
      icon: (
        <ListBulletIcon
          className="block h-5 w-5 font-bold cursor-pointer"
          aria-hidden="true"
        />
      ),
    },
    {
      link: "#",
      text: "Speler",
      icon: (
        <UsersIcon
          className="block h-5 w-5 font-bold cursor-pointer"
          aria-hidden="true"
        />
      ),
    },
    {
      link: "#",
      text: "Infos",
      icon: (
        <InformationCircleIcon
          className="block h-5 w-5 font-bold cursor-pointer"
          aria-hidden="true"
        />
      ),
    },
    {
      link: "/login",
      text: "Profil",
      icon: (
        <UserIcon
          className="block h-5 w-5 font-bold cursor-pointer"
          aria-hidden="true"
        />
      ),
    },
  ];
  return (
    <div className="fixed bottom-0 w-full flex p-4 items-center justify-around shadow-xl">
      {menuItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <div
            className={classNames(
              pageNo === index + 1 ? "text-main-color" : "text-white",
              "flex flex-col justify-center items-center"
            )}
          >
            {item.icon}
            <p className="font-normal text-xs">{item.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;

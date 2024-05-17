import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import authService from "../../services/auth.service";
import DiscordIcon from "../Icons/DiscordIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import constant from "../../helper/constant";
import Layout from "../Layout";

const ProfileLayout = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser")).user;
    let avatar;
    if (
      user.hasOwnProperty("avatar") === false ||
      user.avatar === null ||
      user.avatar === ""
    )
      avatar = "";
    else avatar = user.avatar;
    const { username, email } = authService.getAuthUser().user;
    setUser({ username: username?.toLowerCase(), email, avatar });
  }, []);

  return (
    <Layout currentNo={4}>
      <div>
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 p-4 mb-4 rounded-md">
          <div className="flex flex-col w-full lg:w-3/12 p-4">
            <div className="flex justify-center items-center p-2">
              {user.avatar === "" ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md w-44 h-44"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  className="rounded-md w-44 h-44"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-center font-bold uppercase text-2xl md:text-sm xl:text-xl">
              {user.username}
            </div>
            <div className="py-4 flex flex-col justify-center gap-4 mt-16">
              {constant.profileMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="relative inline-block font-mono text-xl text-white font-sans font-semibold bg-green-400 bg-gradient-to-tl from-green-400 from-0 to-green-800 to-[74%] border-none rounded-md px-6 py-2.5 transition-all outline-none shadow-inner z-10 after:absolute after:content-[''] after:w-full after:h-0 after:bottom-0 after:left-0 after:rounded-md after:z-[-1] after:bg-green-600 after:bg-gradient-to-tl after:from-green-600 after:from-0 after:to-green-400 after:to-[74%] after:shadow-md after:transition-all hover:text-white hover:after:top-0 hover:after:h-full active:top-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-4 flex items-center justify-center gap-4 md:mt-16">
              <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                <DiscordIcon />
              </div>
              <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                <FacebookIcon />
              </div>
              <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                <InstagramIcon />
              </div>
              <div className="mb-2 inline-block rounded-full bg-green-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                <TwitterIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-9/12 p-4">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLayout;

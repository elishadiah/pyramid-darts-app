import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { StarIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Profile = () => {
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem("authUser")).user;
    let avatar;
    if (
      tmp.hasOwnProperty("avatar") === false ||
      tmp.avatar === null ||
      tmp.avatar === ""
    )
      avatar = "";
    else avatar = tmp.avatar;
    const { username, email } = JSON.parse(
      localStorage.getItem("authUser")
    ).user;
    setUser({ username, email, avatar });
  }, []);

  const events = [
    {
      id: 3,
      title: "Challenge 3",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    },
    {
      id: 4,
      title: "Challenge 4",
      start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
      end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    },
  ];

  const addMinutes = (date, minutes) => {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);
    return dateCopy;
  };

  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={0} />
      <div className="p-8">
        <div className="flex border border-gray-200 bg-white p-4 rounded-md">
          <div className="w-4/12 flex flex-col space-y-4">
            <div className="flex justify-center items-center">
              {user.avatar === "" ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  className="rounded-md w-72 h-72"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-left flex items-center">
              <p className="w-4 h-4 bg-green-400 inline-block mx-4" />
              I'm Online
            </div>
          </div>
          <div className="w-8/12 text-left">
            <p className="text-4xl mb-4">{user.username}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <StarIcon
                  className="block h-8 w-8 text-green-500"
                  aria-hidden="true"
                />
                <span>10</span>
              </div>
              <div className="flex items-center">
                <TrophyIcon
                  className="block h-8 w-8 text-green-500"
                  aria-hidden="true"
                />
                <span>50%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl mb-2">Description</p>
              <div className="border-t-2 border-gray-200 p-4">Expert!!!</div>
            </div>
          </div>
        </div>
        <div className="p-8 bg-white mt-8 rounded-md">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

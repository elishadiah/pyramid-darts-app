import React, { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../Header";
import http from "../../helper/http-client";
import Loading from "../Loading";
import EmailNotify from "../../helper/emailjs";
import authService from "../../services/auth.service";
import Modal from "../Modal";
import DiscordIcon from "../Icons/DiscordIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import constant from "../../helper/constant";

const ProfileLayout = ({ children }) => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [schedules, setSchedules] = useState(null);
  // const [events, setEvents] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

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
    setUser({ username, email, avatar });
    fetchSchedules();
  }, []);

  const events = useMemo(
    () =>
      schedules?.map((val) => ({
        id: val._id,
        title: `Challenge - ${val.challenger} : ${val.receiver}`,
        start: new Date(val.date),
        end: addMinutes(val.date, 60),
      })),
    [schedules]
  );

  // useEffect(() => {
  //   console.log("Schedules-state-->>", schedules);
  //   if (schedules) {
  //     setEvents(
  //       schedules.map((val) => ({
  //         id: val._id,
  //         title: `Challenge - ${val.challenger} : ${val.receiver}`,
  //         start: new Date(val.date),
  //         end: addMinutes(val.date, 60),
  //       }))
  //     );
  //   }
  // }, [schedules]);

  const getCurrentTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
  };

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const { username } = JSON.parse(localStorage.getItem("authUser")).user;
      const res = await http.get("/schedule/fetch-all");
      const tmp = res.data.filter(
        (val) =>
          val.challenger.includes(username) || val.receiver.includes(username)
      );
      setSchedules(tmp);
    } catch (err) {
      console.log("fetch-schedule--err-->>", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalendar = (e) => {
    schedules && setCurrentSchedule(schedules.find((val) => val._id === e.id));
    setIsOpen(true);
  };

  const addMinutes = (date, minutes) => {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    return dateCopy;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    currentSchedule &&
      EmailNotify.sendNotificationEmail(
        currentSchedule.challenger,
        currentSchedule.challengerEmail,
        currentSchedule.receiver,
        currentSchedule.receiverEmail,
        `${currentSchedule.challenger} sent you a challenge. Please login https://lidarts.org and accept the challenge. Your username must be same with username of lidarts.org`,
        "Schedule Challenge"
      );
    http.post("/schedule/remove", currentSchedule);
    http.post("/event/post", {
      content: `${currentSchedule.challenger} create a scheduled challenge`,
    });
    window.open(
      `https://lidarts.org/game/create?opponent_name=${currentSchedule.receiver}`,
      "_blank"
    );
    navigate("/result");
  };

  const updateResult = async (data) => {
    try {
      await http.post("/result/post", data);
    } catch (err) {
      console.log(err);
    }
  };

  const onDecline = async () => {
    http.post("/schedule/remove", currentSchedule);
    http.post("/event/post", {
      content: `${currentSchedule.receiver} rejected a scheduled challenge`,
    });
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: user.username.trim(),
      });
      const resOther = await http.post("/result/fetch", {
        username: currentSchedule.challenger.trim(),
      });
      const resAll = await http.get("/result/fetch-all");

      let user1Update = { ...resOther.data };
      let user2Update = { ...res.data };

      const availablePositionNo = Math.pow(2, 7 - user2Update.level);
      const currentAbovePlayersNo = resAll.data.filter(
        (val) => val.level === user2Update.level + 1
      ).length;
      const rowSpotNo = availablePositionNo - currentAbovePlayersNo;

      user2Update = {
        ...user2Update,
        currentVictoryStreak: 0,
        previousWin: false,
        level:
          res.data.level > resOther.data.level
            ? resOther.data.level
            : res.data.level,
      };

      user1Update = {
        ...user1Update,
        level:
          res.data.level > resOther.data.level
            ? res.data.level
            : res.data.level < resOther.data.level
            ? resOther.data.level
            : rowSpotNo < 1
            ? res.data.level
            : res.data.level + 1,
      };

      updateResult(user1Update);
      updateResult(user2Update);

      fetchSchedules();
      EmailNotify.sendNotificationEmail(
        currentSchedule.receiver,
        currentSchedule.receiverEmail,
        currentSchedule.challenger,
        currentSchedule.challengerEmail,
        `${currentSchedule.receiver} hat Ihre Anfechtung abgelehnt`,
        "Schedule Challenge"
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    closeModal();
  };

  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={4} />
      <div className="p-8">
        <div className="flex flex-col md:flex-row bg-white p-4 mb-4 rounded-md">
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
            <div className="text-center font-bold uppercase text-3xl lg:text-4xl">
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

        {isLoading ? (
          <Loading />
        ) : (
          events && (
            <div className="p-8 bg-white mt-8 rounded-md">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleCalendar}
                style={{ height: 500 }}
              />
            </div>
          )
        )}

        {currentSchedule && (
          <Modal title="Scheduled Fight" isOpen={isOpen} onClose={closeModal}>
            <p>
              Challenge - {currentSchedule.challenger} :{" "}
              {currentSchedule.receiver}{" "}
            </p>
            <p>
              Time:
              {new Date(currentSchedule.date).toLocaleString("en-US", {
                timeZone: getCurrentTimeZone(),
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-green-400"
                onClick={onClick}
                disabled={user.username === currentSchedule.receiver}
              >
                Create
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-green-400"
                onClick={onDecline}
                disabled={user.username === currentSchedule.challenger}
              >
                Decline
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;

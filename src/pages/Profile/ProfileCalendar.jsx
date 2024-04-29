import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import ProfileLayout from "../../components/Profile/ProfileLayout";
import http from "../../helper/http-client";
import authService from "../../services/auth.service";
import Loading from "../../components/Loading";
import EmailNotify from "../../helper/emailjs";
import Modal from "../../components/Modal";

const ProfileCalendar = () => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);

  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState(null);
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
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
    setUser({ username: username?.toLowerCase(), email, avatar });
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const { username } = JSON.parse(localStorage.getItem("authUser")).user;
      const res = await http.get("/schedule/fetch-all");
      const tmp = res.data.filter(
        (val) =>
          val.challenger?.toLowerCase().includes(username?.toLowerCase()) ||
          val.receiver?.toLowerCase().includes(username?.toLowerCase())
      );
      setSchedules(tmp);
    } catch (err) {
      console.log("fetch-schedule--err-->>", err);
    } finally {
      setIsLoading(false);
    }
  };

  const events = useMemo(
    () =>
      schedules?.map((val) => ({
        id: val._id,
        title: `Challenge - ${val.challenger?.toLowerCase()} : ${val.receiver?.toLowerCase()}`,
        start: new Date(val.date),
        end: addMinutes(val.date, 60),
      })),
    [schedules]
  );

  const getCurrentTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
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
        username: user.username.trim()?.toLowerCase(),
      });
      const resOther = await http.post("/result/fetch", {
        username: currentSchedule.challenger.trim()?.toLowerCase(),
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
    <div>
      <ProfileLayout>
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
                disabled={
                  user.username?.toLowerCase() ===
                  currentSchedule.receiver?.toLowerCase()
                }
              >
                Create
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-green-400"
                onClick={onDecline}
                disabled={
                  user.username?.toLowerCase() ===
                  currentSchedule.challenger?.toLowerCase()
                }
              >
                Decline
              </button>
            </div>
          </Modal>
        )}
      </ProfileLayout>
    </div>
  );
};

export default ProfileCalendar;

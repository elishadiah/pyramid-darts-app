import React, { useEffect, useState, Fragment } from "react";
import Header from "../../components/Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import http from "../../utility/http-client";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loading from "../../components/Loading";
import AchievementImages from "../../utility/images";
import AchievementVariables from "../../utility/variables";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import EmailNotify from "../../utility/emailjs";
import HandleAchievement from "../../utility/achievements";
import AchievementItemComponent from "../../components/AchievementItem";

const Profile = ({ socket }) => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [achievement, setAchievement] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [events, setEvents] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

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
    fetchResult(username);
    fetchSchedules();
  }, []);

  useEffect(() => {
    console.log("Schedules-state-->>", schedules);
    if (schedules) {
      setEvents(
        schedules.map((val) => ({
          id: val._id,
          title: `Challenge - ${val.challenger} : ${val.receiver}`,
          start: new Date(val.date),
          end: addMinutes(val.date, 60),
        }))
      );
    }
  }, [schedules]);

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

  const fetchResult = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: data.trim(),
      });
      setResult(res.data);

      const highIndex = res.data.highFinish.reduce((acc, element, index) => {
        if (Number(element) !== 0) {
          acc.push(index);
        }
        return acc;
      }, []);

      setAchievement({
        finishing: highIndex,
      });

      console.log("--------Init-profile--result-------", res.data);
    } catch (err) {
      console.log("-------Init-profile--err---", err);
      setResult(null);
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
    http.post("/event/post", {content: `${currentSchedule.challenger} create a scheduled challenge`});
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
    http.post("/event/post", {content: `${currentSchedule.receiver} rejected a scheduled challenge`});
    setIsLoading(true);
    try {
      const res = await http.post("/result/fetch", {
        username: user.username.trim(),
      });
      const resOther = await http.post("/result/fetch", {
        username: currentSchedule.challenger.trim(),
      });
      const resAll = await http.get("/result/fetch-all");
      // Pyramid rows number
      const levels = [];
      resAll.data.forEach((element) => {
        const level = element.level;
        if (!levels[level]) {
          levels[level] = [];
        }
        levels[level].push(element);
      });
      const rowNo = levels.map((val) => val.length);
      const updateLevel1 =
        res.data.level > resOther.data.level
          ? resOther.data.level
          : res.data.level;
      const updateLevel2 =
        res.data.level > resOther.data.level
          ? res.data.level
          : rowNo[resOther.data.level] - rowNo[resOther.data.level + 1] > 2
          ? resOther.data.level + 1
          : resOther.data.level;
      const updateResult1 = {
        ...res.data,
        previousWin: false,
        currentVictoryStreak: 0,
        level: updateLevel1,
      };
      const updateResult2 = {
        ...resOther.data,
        previousWin: true,
        currentVictoryStreak: resOther.data.currentVictoryStreak + 1,
        maxVictoryStreak:
          resOther.data.currentVictoryStreak + 1 >
          resOther.data.maxVictoryStreak
            ? resOther.data.currentVictoryStreak + 1
            : resOther.data.maxVictoryStreak,
        sentTotalChallengeNo: resOther.data.sentTotalChallengeNo + 1,
        level: updateLevel2,
      };
      updateResult(updateResult1);
      updateResult(updateResult2);
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
      <Header current={0} socket={socket} />
      <div className="p-8">
        <div className="flex sm:flex-row flex-col border border-gray-200 bg-white p-4 mb-4 rounded-md">
          <div className="w-full sm:w-4/12 flex flex-col space-y-4 rounded-xl py-8 sm:py-4">
            <div className="flex justify-center items-center">
              {user.avatar === "" ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md w-44 h-44 lg:w-72 lg:h-72 sm:w-44 sm:h-44"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  className="rounded-md w-44 h-44 lg:w-72 lg:h-72 sm:w-44 sm:h-44"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-center font-bold lg:text-4xl sm:text-2xl md:text-3xl">
              {user.username}
            </div>
          </div>
          <div className="w-full sm:w-8/12 text-left p-4">
            {isLoading ? (
              <Loading />
            ) : (
              result && (
                <div className="px-4">
                  <AchievementItemComponent
                    result={result.sentTotalChallengeNo}
                    max={100}
                    iconSize="xl:w-24 xl:h-24 lg:w-20 lg:h-20 sm:w-16 sm:h-16 w-20 h-20"
                    achievementIcons={AchievementImages.FRIENDLY_CHALLENGER}
                    handleActive={HandleAchievement.friendlyActive}
                  />
                  <AchievementItemComponent
                    result={result.maxVictoryStreak}
                    max={10}
                    iconSize="w-24 h-20"
                    achievementIcons={AchievementImages.STREAK}
                    handleActive={HandleAchievement.streakActive}
                  />
                  <AchievementItemComponent
                    result={result.master26}
                    max={1000}
                    iconSize="lg:w-24 lg:h-20"
                    achievementIcons={AchievementImages.BREAKFAST}
                    handleActive={HandleAchievement.breakfastActive}
                  />

                  <div className="flex flex-wrap justify-center mt-8 max-h-40 sm:max-h-full sm:overflow-y-none overflow-y-auto">
                    {AchievementImages.FINISHINGACE.map((val, index) =>
                      achievement.finishing.includes(index) ? (
                        <div
                          className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                          key={index}
                        >
                          <img
                            src={val}
                            className="sm:w-20 sm:h-20 w-full"
                            alt="achievement-icon"
                          />
                        </div>
                      ) : (
                        <div
                          className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                          key={index}
                        >
                          <img
                            src={val}
                            className="opacity-50 sm:w-20 sm:h-20 w-full"
                            alt="achievement-icon"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
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
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Scheduled Fight
                      </Dialog.Title>
                      <p>
                        Challenge - {currentSchedule.challenger} :{" "}
                        {currentSchedule.receiver}{" "}
                      </p>
                      <p>
                        Time:
                        {new Date(currentSchedule.date).toLocaleString(
                          "en-US",
                          {
                            timeZone: getCurrentTimeZone(),
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
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
                          disabled={
                            user.username === currentSchedule.challenger
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </div>
  );
};

export default Profile;

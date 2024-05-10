import { Fragment, useState, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DateObject, Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailNotify from "../../helper/emailjs";
import Modal from "../Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Card = ({
  player,
  available,
  onlineShow,
  connectedUsers,
  isHighlighted,
  sendQuickFight,
  sendScheduledFight,
  children,
  imgSize,
}) => {
  const navigate = useNavigate();
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [value, setValue] = useState(new DateObject());
  const [user, setUser] = useState({});

  const topPosition = useMemo(() => {
    switch (imgSize) {
      case 16:
        return "top-20";
      case 14:
        return "top-16";
      case 12:
        return "top-16";
      case 10:
        return "top-14";
      case 8:
        return "top-12";
      default:
        return "top-10";
    }
  }, [imgSize]);

  const connected = useMemo(
    () =>
      connectedUsers.find(
        (val) => val.username?.toLowerCase() === player.username?.toLowerCase()
      )?.connected,
    [connectedUsers, player]
  );

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser) {
      setUser(authUser.user);
    }
  }, []);

  const closeModalSchedule = () => setIsOpenSchedule(false);
  const openModalSchedule = () => setIsOpenSchedule(true);

  const isDateValid = (selectedDate) => {
    if (selectedDate) {
      const currentDate = moment().startOf("day");
      const selectedMoment = moment(selectedDate, "YYYY-MM-DD").startOf("day");
      const nextThreeDays = moment().add(3, "days").startOf("day");

      return selectedMoment.isBetween(currentDate, nextThreeDays, null, "[]");
    }
    return false;
  };

  const onSendSchedule = () => {
    const selectedDate = new Date(
      value.year,
      value.month.index,
      value.day,
      value.hour,
      value.minute
    );
    if (!isDateValid(selectedDate))
      toast(
        "Reservierte Herausforderungen werden innerhalb von 72 Stunden verfügbar sein."
      );
    else {
      sendScheduledFight(
        selectedDate,
        user.username,
        user.email,
        player.username,
        player.email
      );
      EmailNotify.sendNotificationEmail(
        user.username,
        user.email,
        player.username,
        player.email,
        `${user.username?.toLowerCase()} sent you a scheduled challenge. Challenge date: ${new Date(
          value.year,
          value.month.index,
          value.day,
          value.hour,
          value.minute
        )}.`,
        "Dart Challenge"
      );
      closeModalSchedule();
    }
  };

  const sendQuick = () => {
    sendQuickFight(player.username, user.username, user.email);
    EmailNotify.sendNotificationEmail(
      user.username,
      user.email,
      player.username,
      player.email,
      `${user.username?.toLowerCase()} sent you a challenge. Please login https://lidarts.org and accept the challenge. Your username must be same with username of lidarts.org`,
      "Dart Challenge"
    );
    window.open(
      `https://lidarts.org/game/create?opponent_name=${player.username?.toLowerCase()}`,
      "_blank"
    );
    navigate("/result");
  };

  const onClickModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  return (
    <>
      <div
        id={player._id}
        className={classNames(
          "group relative flex shadow h-full p-2 m-2",
          isHighlighted ? "border border-2 border-green-500 bg-green-100" : "",
          onlineShow && !connected && "hidden"
        )}
      >
        {connected ? (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-700"></span>
          </span>
        ) : (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-700"></span>
          </span>
        )}
        <div className="cursor-pointer" onClick={onClickModal}>
          {player.avatar ? (
            <img
              className={`mx-auto flex-shrink-0 rounded-full`}
              src={player.avatar}
              style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
              alt="user avatar"
            />
          ) : (
            <div
              className={`mx-auto flex items-center justify-center flex-shrink-0 bg-green-200 rounded-full text-xl font-bold`}
              style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
            >
              {player.username.toLocaleUpperCase().charAt(0)}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <div className="w-full bg-white dark:bg-gray-800">
          <div className="flex flex-col items-center py-4">
            {player.avatar ? (
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={player.avatar}
                alt="user avatar"
              />
            ) : (
              <div className="w-24 h-24 mb-3 rounded-full bg-green-200 shadow-lg flex items-center justify-center text-5xl">
                {player.username?.toUpperCase().charAt(0)}
              </div>
            )}
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {player.username?.toUpperCase()}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {player.email}
            </span>
            <div className="flex mt-4 md:mt-6 gap-2">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50"
                disabled={
                  player.username?.toLowerCase() ===
                    user.username?.toLowerCase() || !available
                }
                onClick={sendQuick}
              >
                Quick Fight
              </button>
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50"
                disabled={
                  player.username?.toLowerCase() ===
                    user.username?.toLowerCase() || !available
                }
                onClick={openModalSchedule}
              >
                Schedule Fight
              </button>
            </div>
          </div>
        </div>
        {/* <div
          className={classNames(
            "flex flex-col w-full items-center justify-center gap-4",
          )}
        >
          <div className="flex flex-col h-16 p-4">
            <p className="font-bold text-xl">
              {player.username?.toLowerCase()}
            </p>
          </div>
          <div className="flex items-center justify-center divide-x divide-gray-900 dark:divide-gray-200 dark:divide-gray-900">
            <div className="w-6/12 p-2">
              <button
                className="text-center font-semibold bg-green-500 text-white rounded-md p-2 disabled:opacity-50"
                disabled={
                  player.username?.toLowerCase() ===
                    user.username?.toLowerCase() || !available
                }
                onClick={sendQuick}
              >
                Quick Fight
              </button>
            </div>
            <div className="w-6/12 p-2">
              <button
                className="text-center font-semibold bg-green-500 text-white rounded-md p-2 disabled:opacity-50"
                disabled={
                  player.username?.toLowerCase() ===
                    user.username?.toLowerCase() || !available
                }
                onClick={openModalSchedule}
              >
                Scheduled Fight
              </button>
            </div>
          </div>
        </div> */}
      </Modal>

      <Modal
        title="Scheduled Fight"
        isOpen={isOpenSchedule}
        onClose={closeModalSchedule}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            You can send the scheduled challenge to your opponent.
          </p>
        </div>
        <div className="mt-2 flex justify-center">
          <Calendar
            value={value}
            onChange={setValue}
            plugins={[<TimePicker />]}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            onClick={onSendSchedule}
          >
            Send
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            onClick={closeModalSchedule}
          >
            Close
          </button>
        </div>
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Card;

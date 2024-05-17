import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { DateObject, Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailNotify from "../../helper/emailjs";
import Modal from "../Modal";
import authService from "../../services/auth.service";
import images from "../../helper/images";
import { transformSummaryData } from "../../helper/helper";

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
  imgSize,
}) => {
  const navigate = useNavigate();
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [value, setValue] = useState(new DateObject());
  const [user, setUser] = useState({});
  const loggedInUserRef = useRef(null);

  const connected = useMemo(
    () =>
      connectedUsers.find(
        (val) => val.username?.toLowerCase() === player.username?.toLowerCase()
      )?.connected,
    [connectedUsers, player]
  );

  useEffect(() => {
    const authUser = authService.getAuthUser();
    if (authUser) {
      setUser(authUser.user);
    }

    loggedInUserRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [player?.username, user?.username]);

  const closeModalSchedule = () => setIsOpenSchedule(false);
  const openModalSchedule = () => setIsOpenSchedule(true);

  const handleClickProfile = useCallback((payload) => {
    window.location.href = `/profile/${payload}`;
  }, []);

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
    <div>
      <div
        id={player._id}
        ref={
          player?.username?.toLowerCase() === user?.username?.toLowerCase()
            ? loggedInUserRef
            : null
        }
        className={classNames(
          "group relative flex shadow p-2 m-2",
          isHighlighted ? "border border-2 border-green-500 bg-green-100" : "",
          player?.username?.toLowerCase() === user?.username?.toLowerCase()
            ? "border border-2 border-green-500 bg-green-100"
            : "",
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
            <div className="relative">
              <img
                className={`mx-auto flex-shrink-0 rounded-full z-30 ${
                  player?.level === 6 && "absolute"
                }`}
                src={player.avatar}
                style={{
                  width: `${imgSize * 4}px`,
                  height: `${imgSize * 4}px`,
                  top: "20%",
                  left: "50%",
                  transform: `translateX(-${player?.level === 6 ? 50 : 0}%)`,
                }}
                alt="user avatar"
              />
              {player?.level === 6 && (
                <img
                  style={{
                    width: `${imgSize * 7}px`,
                    height: `${imgSize * 7}px`,
                  }}
                  src={images.TOPPLACE}
                  alt="top-place"
                />
              )}
            </div>
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
        <div className="relative w-full bg-white dark:bg-gray-800">
          <div className="flex flex-col items-center py-4">
            {player.avatar ? (
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={player.avatar}
                alt="user avatar"
                onClick={() => handleClickProfile(player.username)}
              />
            ) : (
              <div
                className="w-24 h-24 mb-3 rounded-full bg-green-200 shadow-lg flex items-center justify-center text-5xl"
                onClick={() => handleClickProfile(player?.username)}
              >
                {player.username?.toUpperCase().charAt(0)}
              </div>
            )}
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {player.username?.toUpperCase()}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {player.email}
            </span>
            <div className="mt-2">
              {player?.createdAt && (
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Register: {new Date(player?.createdAt).toDateString()}
                </p>
              )}
              <div className="flex gap-2 justify-center">
                <p className="text-sm text-gray-500 dart:text-gray-400">
                  Fight: {player?.sentTotalChallengeNo + player?.readyForIt}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Doubles: {transformSummaryData(player)?.overall?.Doubles}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average: {transformSummaryData(player)?.overall?.MatchAvg}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  First 9 Avg: {transformSummaryData(player)?.overall?.First9Avg}
                </p>
              </div>
            </div>
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
          {player?.level === 6 ? (
            <div className="absolute top-0 right-0">
              <img className="w-8 h-8" src={images.GOLDCROWN} alt="badge" />
            </div>
          ) : player?.level === 5 ? (
            <div className="absolute top-0 right-0">
              <img className="w-8 h-8" src={images.SNDBADGE} alt="badge" />
            </div>
          ) : (
            player?.level === 0 && (
              <div className="absolute top-0 right-0">
                <img className="w-8 h-8" src={images.BEGINNER} alt="badge" />
              </div>
            )
          )}
        </div>
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
    </div>
  );
};

export default Card;

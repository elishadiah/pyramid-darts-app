import { Fragment, useState, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DateObject, Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailNotify from "../../helper/emailjs";

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
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(new DateObject());
  const [user, setUser] = useState({});

  const connected = useMemo(
    () =>
      connectedUsers.find(
        (val) => val.username?.toLowerCase() === player.username?.toLowerCase()
      )?.connected,
    [connectedUsers, player]
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("authUser")).user);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const isDateValid = (selectedDate) => {
    if (selectedDate) {
      const currentDate = moment().startOf("day");
      const selectedMoment = moment(selectedDate, "YYYY-MM-DD").startOf("day");
      const nextThreeDays = moment().add(3, "days").startOf("day");

      return selectedMoment.isBetween(currentDate, nextThreeDays, null, "[]");
    }
    return false;
  };

  const onClick = () => {
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
      closeModal();
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
        {children}
        <div className="absolute w-64 flex flex-col divide-y divide-gray-900 dark:divide-gray-200 shadow-md shadow-gray-400 dark:shadow-gray-700 dark:divide-gray-900 top-10 -left-20 scale-0 z-30 transition-all rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-900 dark:text-white group-hover:scale-100">
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
                onClick={openModal}
              >
                Scheduled Fight
              </button>
            </div>
          </div>
        </div>
      </div>
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClick}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Card;

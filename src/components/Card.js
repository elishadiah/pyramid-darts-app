import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DateObject, Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import emailjs from "@emailjs/browser";

const Card = ({ username, score, uuid, email, sendQuickFight, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(new DateObject());
  const [user, setUser] = useState({});

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onClick = () => {
    console.log("Calendar===>>>", value.month);
  };

  const sendQuick = () => {
    sendQuickFight(username, user.username);
    emailjs
      .send(
        "service_e37gjno",
        "template_c69m2ru",
        {
          from_name: user.username,
          from_email: user.email,
          to_email: email,
          to_name: username,
          subject: "Dart Challenge",
          message: `${user.username} sent you a challenge. Please login https://lidarts.org and accept the challenge.`,
        },
        { publicKey: "rASlZgWjQ3kN4qzUG", privateKey: "CQFRfh6s1JpgbDaD3nWlH" }
      )
      .then(
        function (response) {
          console.log("Email sent successfully!", response);
          // Handle success
        },
        function (error) {
          console.error("Email sending failed:", error);
          // Handle error
        }
      );
    window.open(`https://lidarts.org/game/create?opponent_name=${username}`, "_blank");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("authUser")).user);
  }, []);

  return (
    <>
      <div className="group relative flex shadow">
        {children}
        <div className="absolute w-64 flex flex-col divide-y divide-gray-900 dark:divide-gray-200 shadow-md shadow-gray-400 dark:shadow-gray-700 dark:divide-gray-900 top-10 -left-20 scale-0 z-30 transition-all rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-900 dark:text-white group-hover:scale-100">
          <div className="flex flex-col h-20 p-4">
            <p className="font-bold text-xl">{username}</p>
            <p className="font-normal text-lg">score: {score}</p>
          </div>
          <div className="flex items-center justify-center divide-x divide-gray-900 dark:divide-gray-200 dark:divide-gray-900">
            <div className="w-6/12 p-2">
              <button
                className="text-center font-semibold bg-green-500 text-white rounded-md p-2 disabled:opacity-50"
                disabled={uuid === user._id}
                onClick={sendQuick}
              >
                Quick Fight
              </button>
            </div>
            <div className="w-6/12 p-2">
              <button
                className="text-center font-semibold bg-green-500 text-white rounded-md p-2 disabled:opacity-50"
                disabled={uuid === user._id}
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
    </>
  );
};

export default Card;

// function CustomButton({ ...props }) {
//   const handleClick = (e) => {
//     props.openCalendar();
//     props.onFocus();
//     props.onChange(e);
//     console.log("Calendar-->>>", props);
//   };
//   return (
//     <button
//       className="text-center font-semibold bg-green-500 text-white rounded-md p-2"
//       onClick={(e) => handleClick(e)}
//     >
//       Scheduled Fight
//     </button>
//   );
// }

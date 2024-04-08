import { useEffect } from "react";
import Header from "../../components/Header";
import constant from "../../utility/constant";
import socket from "../../socket";
import authService from "../../services/auth.service";

const Infos = () => {
  useEffect(() => {
    const sessionID = authService.getAuthUser().user._id;
    const username = authService.getAuthUser().user.username;
    if (sessionID) {
      socket.auth = { sessionID, username };
      socket.connect();
    }

    const handleErr = (err) => {
      console.log("Socket--err-->>", err);
    };

    const handleUserID = ({ userID }) => {
      socket.userID = userID;
    };

    socket.on("session_id", handleUserID);
    socket.on("connect_error", handleErr);

    return () => {
      socket.off("connect_error", handleErr);
      socket.off("session_id", handleUserID);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative sm:pb-24 dark:bg-gray-800">
      <div className="relative">
        <Header current={3} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <div className="mb-12">
            <div className="flex justify-center mb-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 bg-white border border-gray-200 shadow-md shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-800 py-2 px-8 rounded-md">
                Regeln
              </h3>
            </div>
            <ul className="space-y-3">
              {constant.infoTexts.map((item, index) => (
                <li
                  key={index}
                  className="overflow-hidden text-left rounded-md bg-white px-6 py-4 shadow dark:bg-gray-900 dark:text-gray-100"
                >
                  <span className="text-gray-400 dark:text-gray-600">
                    {item.title}
                    {": "}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 bg-white border border-gray-200 shadow-md shadow-gray-300 dark:bg-gray-900 dark:shadow-gray-700 dark:border-gray-800 py-2 px-8 rounded-md">
                Zusatz
              </h3>
            </div>
            <ul className="space-y-3">
              {constant.additiveTexts.map((item, index) => (
                <li
                  key={index}
                  className="overflow-hidden text-left rounded-md bg-white px-6 py-4 shadow dark:bg-gray-900 dark:text-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;

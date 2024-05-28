import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import images from "../../helper/images";
import Loading from "../Loading";
import EmailNotify from "../../helper/emailjs";
import socket from "../../socket";
import authService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchAllSeasons from "../../hooks/useFetchAllSeasons";

const TopPlaces = ({ current }) => {
  const navigate = useNavigate();
  const user = authService.getAuthUser()?.user;
  const { isLoading, currentSeason, lastSeason } = useFetchAllSeasons();

  useEffect(() => {
    const handleFoundUser = (data) => {
      // if (data) {
        socket.emit("challenge", {
          message: `<a target="_blank" href="https://lidarts.org">
          ${user?.username}(Email: ${
            user?.email
          }) has sent you the challenge. The
          result of this challenge will not affect your ranking. It is just for
          fun. Enjoy!
          <br />
          ${new Date().toLocaleString()}
        </a>`,
          to: data?.userID,
        });
        window.open(
          `https://lidarts.org/game/create?opponent_name=${data?.username?.toLowerCase()}`,
          "_blank"
        );
        navigate("/top-challenge-result");
      // } else toast.warning("User is not online.");
    };

    socket.on("foundUser", handleFoundUser);
    return () => {
      socket.off("foundUser");
    };
  }, [user, navigate]);

  const displayData = useMemo(
    () => (current ? currentSeason?.topMembers : lastSeason?.topMembers),
    [current, currentSeason, lastSeason]
  );

  const handleChallenge = useCallback(
    (player) => {
      socket.emit("findUserByName", {
        username: player.username,
      });
      EmailNotify.sendNotificationEmail(
        user.username,
        user.email,
        player.username,
        player.email,
        `${user?.username} sent you a challenge. Please login https://lidarts.org and accept the challenge. Your username must be same with username of lidarts.org. The result of this challenge will not affect your ranking. It is just for fun. Enjoy!`,
        "Fun Challenge"
      );
    },
    [user]
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : displayData?.length ? (
        <div>
          {current ? (
            <h3 className="text-5xl font-bold my-8">
              Top Players in Current Season
            </h3>
          ) : (
            <h3 className="text-5xl font-bold my-8">
              Top Players in Last Season
            </h3>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {displayData?.map((player) => {
              return (
                <div
                  key={player._id}
                  className="w-full sm:w-48p lg:flex-1 relative flex max-w-sm lg:max-w-72 border border-2 border-yellow-600 p-4 bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end dark:bg-gray-800 text-white rounded-lg"
                >
                  <img
                    className="w-6 h-6 lg:w-4 lg:h-4 absolute top-2 right-2"
                    src={images.GOLDCROWN}
                    alt="top-place-bg"
                  />
                  <div className="relative flex items-center justify-center w-2/5">
                    {player.avatar ? (
                      <div className="relative text-4xl flex items-center justify-center font-bold w-28 h-28 rounded-full">
                        <img
                          className="absolute z-30 w-12 h-12 bottom-9 rounded-full"
                          src={player?.avatar}
                          alt="top-user"
                        />
                        <img
                          className="w-28"
                          src={images.TOPPLACE2}
                          alt="top-place-bg"
                        />
                      </div>
                    ) : (
                      <p className="relative text-4xl flex items-center justify-center p-2 font-bold w-28 h-28 rounded-full">
                        <span className="absolute z-30 w-12 h-12 bottom-9 rounded-full">
                          A
                        </span>
                        <img
                          className="w-28"
                          src={images.TOPPLACE2}
                          alt="top-place-bg"
                        />
                      </p>
                    )}
                  </div>
                  <div className="w-3/5 flex flex-col items-start sm:justify-center sm:items-center">
                    <p className="text-3xl lg:text-2xl font-semibold mb-2">
                      {player.username}
                    </p>
                    <button
                      className="border px-2 py-1 rounded-lg disabled:opacity-50"
                      disabled={
                        player?.username?.toLowerCase() ===
                        user?.username?.toLowerCase()
                      }
                      onClick={() => handleChallenge(player)}
                    >
                      Challenge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TopPlaces;

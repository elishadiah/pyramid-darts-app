import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import http from "../../helper/http-client";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import HandleResult from "../../helper/result";
import AchievementImages from "../../helper/images";
import authService from "../../services/auth.service";
import Modal from "../../components/Modal";
import { convertStr } from "../../helper/helper";

const Result = ({ socket }) => {
  const navigate = useNavigate();
  const [resultUrl, setResultUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalResult, setTotalResult] = useState(null);
  const [updatedResult, setUpdatedResult] = useState(null);
  const [updatedAchievements, setUpdatedAchievements] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = resultUrl.split("/");
      url.splice(3, 0, "api");
      const res = await http.get("/result/get", {
        params: { url: url.join("/") },
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setTotalResult(res.data);
      setUpdatedResult(HandleResult.updateResult(res.data));
    } catch (err) {
      console.log(err);
      setTotalResult(null);
      toast.warning(err.data);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/pyramid");
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (updatedResult) {
      const currentUser = authService
        .getAuthUser()
        .user.username?.toLowerCase();
      console.log(
        "Save--->>>",
        updatedResult,
        "::::",
        currentUser,
        "::::-->>>",
        updatedResult.find(
          (val) => val?.username?.toLowerCase() === currentUser
        )
      );

      if (
        updatedResult.find(
          (val) => val?.username?.toLowerCase() === currentUser
        )
      ) {
        const earnedAchievement = HandleResult.handleAchievement(
          updatedResult.find(
            (val) => val?.username?.toLowerCase() === currentUser
          ),
          totalResult.allResult.find(
            (val) => val?.username?.toLowerCase() === currentUser
          )
        );
        setUpdatedAchievements(earnedAchievement);

        earnedAchievement.length && setIsModalOpen(true);
        const user1Init = totalResult.allResult.find(
          (val) =>
            val?.username?.toLowerCase() ===
            totalResult.user1?.name?.toLowerCase()
        );

        if (new Date(user1Init?.date) >= new Date(totalResult?.begin)) {
          toast("Dieses Spiel wurde bereits gespeichert.");
        } else {
          setIsLoading(true);
          try {
            await Promise.all(
              updatedResult.map(async (val) => {
                await http.post("/result/post", val);
              })
            );
          } catch (err) {
            toast("Beim Speichern der Daten ist ein Fehler aufgetreten");
          } finally {
            setIsLoading(false);
          }
        }
      } else {
        toast.warning(
          "Fight results are other players' results, so the results cannot be saved."
        );
      }
    } else {
      toast.warning(
        "Benutzername nicht gefunden. Spielergebnisse können nicht gespeichert werden."
      );
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setResultUrl(e.target.value);
  };

  return (
    <div>
      <Header current={0} socket={socket} />
      <div className="mx-auto max-w-2xl p-8 mt-20 lg:max-w-4xl lg:px-12">
        <form
          className="border p-4 rounded-md shadow shadow-md"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="result"
            className="block text-lg text-left font-semibold leading-6 mb-2 text-gray-900 dark:text-white"
          >
            Lidarts-URL
          </label>
          <input
            type="text"
            name="result"
            id="result"
            placeholder="https://lidarts.org/game/ABCD1234"
            className="block w-full rounded-md border-0 py-1.5 px-4 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-white/5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 focus-border-none focus-outline-none"
            onChange={onChange}
          />
          <div className="flex space-x-4 mt-2">
            <button
              type="submit"
              className="flex-1 relative inline-block font-mono text-xl text-white font-sans font-semibold bg-green-400 bg-gradient-to-tl from-green-400 from-0 to-green-800 to-[74%] border-none rounded-md px-6 py-2.5 transition-all outline-none shadow-inner z-10 after:absolute after:content-[''] after:w-full after:h-0 after:bottom-0 after:left-0 after:rounded-md after:z-[-1] after:bg-green-600 after:bg-gradient-to-tl after:from-green-600 after:from-0 after:to-green-400 after:to-[74%] after:shadow-md after:transition-all hover:text-white hover:after:top-0 hover:after:h-full active:top-1 disabled:opacity-50 disabled:bg-green-400"
              disabled={isLoading ? true : false}
            >
              Laden
            </button>
            {isLoading ? (
              <div className="col-span-full flex flex-1 items-center justify-center gap-x-8">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={onSave}
                className="flex-1 relative inline-block font-mono text-xl text-white font-sans font-semibold bg-green-400 bg-gradient-to-tl from-green-400 from-0 to-green-800 to-[74%] border-none rounded-md px-6 py-2.5 transition-all outline-none shadow-inner z-10 after:absolute after:content-[''] after:w-full after:h-0 after:bottom-0 after:left-0 after:rounded-md after:z-[-1] after:bg-green-600 after:bg-gradient-to-tl after:from-green-600 after:from-0 after:to-green-400 after:to-[74%] after:shadow-md after:transition-all hover:text-white hover:after:top-0 hover:after:h-full active:top-1"
                disabled={!totalResult}
              >
                Speichern
              </button>
            )}
          </div>
        </form>

        {isLoading ? (
          <div className="mt-12">
            <div className="my-6">
              <Loading />
            </div>
            <div className="my-6">
              <Loading />
            </div>
            <div className="my-6">
              <Loading />
            </div>
          </div>
        ) : (
          totalResult && (
            <div className="border p-4 rounded-md shadow shadow-md mt-12">
              <div className="flex space-x-4">
                <div className="flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {totalResult.user1.name}
                  </h5>
                </div>
                <div className="flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {totalResult.user2.name}
                  </h5>
                </div>
              </div>
              <div className="flex flex-column mx-auto w-1/2 mt-4 bg-green-500 rounded-md px-4 py-1.5">
                <div className="flex-1 text-white font-semibold text-2xl text-center">
                  {totalResult.user1.won}
                </div>
                <div className="flex-1 text-white font-semibold text-xl text-center">
                  Legs
                </div>
                <div className="flex-1 text-white font-semibold text-2xl text-center">
                  {totalResult.user2.won}
                </div>
              </div>
              <p className="font-normal text-lg p-2 my-8 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <span className="font-semibold">Match start: </span>
                {new Date(totalResult.begin).toLocaleString()}
              </p>
            </div>
          )
        )}

        <Modal title="Achievements" isOpen={isModalOpen} onClose={closeModal}>
          <div className="mt-4">
            <p className="text-lg text-center text-gray-500">
              Wow, you have earned {updatedAchievements.length} achievements
            </p>
          </div>

          <div className="max-h-80 overflow-auto">
            {updatedAchievements
              .filter(
                (val) =>
                  !(
                    val?.name.includes("lifetime") ||
                    val?.name.includes("season")
                  )
              )
              .map((val, index) => (
                <div key={index} className="grid grid-cols-5 gap-8 my-2">
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16"
                      src={
                        AchievementImages[
                          val?.name.toUpperCase().split(".")[0]
                        ][val?.index]
                      }
                      alt="achievement-icon"
                    />
                  </div>
                  <p className="font-semibold text-xl col-span-4 flex items-center">
                    {convertStr(val?.name.split(".")[0])}
                    &nbsp;
                    {val?.value}
                  </p>
                </div>
              ))}
            {updatedAchievements
              .filter((val) => val?.name.includes("lifetime"))
              .map((val, index) => (
                <div key={index} className="grid grid-cols-5 gap-8 my-2">
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16"
                      src={
                        AchievementImages[
                          val?.name.toUpperCase().split(".")[0]
                        ][val?.index]
                      }
                      alt="achievement-icon"
                    />
                  </div>
                  <p className="font-semibold text-xl col-span-4 flex items-center">
                    Lifetime: {convertStr(val?.name.split(".")[0])}
                    &nbsp;
                    {val?.value}
                  </p>
                </div>
              ))}
            {updatedAchievements
              .filter((val) => val?.name.includes("season"))
              .map((val, index) => (
                <div key={index} className="grid grid-cols-5 gap-8 my-2">
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16"
                      src={
                        AchievementImages[
                          val?.name
                            .toUpperCase()
                            .replace("SEASON", "")
                            .split(".")[0]
                        ][val?.index]
                      }
                      alt="achievement-icon"
                    />
                  </div>
                  <p className="font-semibold text-xl col-span-4 flex items-center">
                    SEASON: {convertStr(val?.name.split(".")[0])}
                    &nbsp;
                    {val?.value}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              Hooray
            </button>
          </div>
        </Modal>

        {isModalOpen && (
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Result;

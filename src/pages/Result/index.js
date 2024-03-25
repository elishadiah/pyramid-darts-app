import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import http from "../../utility/http-client";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import HandleResult from "../../utility/result";
import AchievementImages from "../../utility/images";
import AchievementVariables from "../../utility/variables";

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
      toast(
        "Beim Abrufen der Match-Ergebnisse ist ein Fehler aufgetreten. Bitte versuche es erneut"
      );
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
      const currentUser = JSON.parse(localStorage.getItem("authUser")).user
        .username;

      const earnedAchievement = HandleResult.handleAcievement(
        updatedResult.find((val) => val.username === currentUser),
        totalResult.allResult.find((val) => val.username === currentUser)
      );

      setUpdatedAchievements(earnedAchievement);

      // earnedAchievement.length && setIsModalOpen(true);
      const user1Init = totalResult.allResult.find(
        (val) => val.username === totalResult.user1.name
      );

      if (
        new Date(user1Init.date).toISOString() ===
        new Date(totalResult.begin).toISOString()
      ) {
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
      toast(
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
              className="flex-1 bg-green-600 text-white p-2 rounded-md font-semibold text-lg disabled:opacity-50 disabled:bg-green-400"
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
                className="flex-1 bg-green-600 text-white p-2 rounded-md font-semibold text-lg"
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

        <Transition appear show={isModalOpen} as={Fragment}>
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
                      className="text-3xl text-center font-medium leading-6 text-gray-900"
                    >
                      Achievements
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-lg text-center text-gray-500">
                        Wow, you have earned {updatedAchievements.length}{" "}
                        achievements
                      </p>
                    </div>

                    <div className="p-4">
                      {updatedAchievements.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-8"
                        >
                          <div>
                            <img
                              className="w-16 h-16"
                              src={
                                AchievementImages[item.name][
                                  AchievementVariables[item.name].findIndex(
                                    (val) => val === Number(item.value)
                                  )
                                ]
                              }
                              alt="achievement-icon"
                            />
                          </div>
                          <p className="font-semibold text-xl">
                            <span className="font-bold text-xl">
                              {item.name}
                            </span>{" "}
                            {item.value}
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Result;

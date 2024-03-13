import { useState, useEffect } from "react";
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
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [totalResult, setTotalResult] = useState(null);
  const [detailResult, setDetailResult] = useState(null);
  const [allInitResult, setAllInitResult] = useState(null);

  useEffect(() => {
    fetchAllResult();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await http.post("/result/get", {
        url: resultUrl,
      });
      const mainResult = HandleResult.handleMainResult(res.data);
      setTotalResult(mainResult);

      // total match number
      let matchNo = [
        ...Array(mainResult.mark.challenger + mainResult.mark.receiver).keys(),
      ];

      getDetailResult(matchNo);

      // console.log("Result-handle--->>>", matchDate);
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

  // fetch previous all result state
  const fetchAllResult = async () => {
    setIsInitLoading(true);
    try {
      const res = await http.get("/result/fetch-all");
      setAllInitResult(res.data);
    } catch (err) {
      setAllInitResult(null);
    } finally {
      setIsInitLoading(false);
    }
  };

  const getDetailResult = async (matchNo) => {
    setIsDetailLoading(true);
    let temp = [];
    try {
      await Promise.all(
        matchNo.map(async (val) => {
          const res = await http.post("/result/detail", {
            url: `${resultUrl}/statistics/1/${val + 1}`,
          });
          temp.push(res.data);
        })
      );
      setDetailResult(temp);

      console.log("---Detai-->>>>", temp);
      toast("Erhalten Sie die Spielergebnisse erfolgreich.");
    } catch (err) {
      setDetailResult(null);
      console.log("Detail-err--->>>>", err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleAcievement = (data) => {
    AchievementVariables.STREAK.find(
      (val) => Number(val) === Number(data.maxVictoryStreak)
    ) &&
      toast(
        <div className="flex">
          <span>
            <img
              className="w-10"
              src={
                AchievementImages.STREAK[
                  AchievementVariables.STREAK.findIndex(
                    (val) => val === Number(data.maxVictoryStreak)
                  )
                ]
              }
              alt="achievement-icon"
            />
          </span>
          {`Glückwunsch! ${data.maxVictoryStreak} Siege in Folge erzielt.`}
        </div>
      );
    AchievementVariables.BREAKFAST.find(
      (val) => val === Number(data.master26)
    ) &&
      toast(
        <div className="flex">
          <span>
            <img
              className="w-10"
              src={
                AchievementImages.BREAKFAST[
                  AchievementVariables.BREAKFAST.findIndex(
                    (val) => val === Number(data.master26)
                  )
                ]
              }
              alt="achievement-icon"
            />
          </span>
          {`Glückwunsch! ${data.master26} Frühstücke erreicht.`}
        </div>
      );
    AchievementVariables.FRIENDLYCHALLENGER.find(
      (val) => val === Number(data.sentTotalChallengeNo)
    ) &&
      toast(
        <div className="flex">
          <span>
            <img
              className="w-10"
              src={
                AchievementImages.FRIENDLY_CHALLENGER[
                  AchievementVariables.FRIENDLYCHALLENGER.findIndex(
                    (val) => val === Number(data.sentTotalChallengeNo)
                  )
                ]
              }
              alt="achievement-icon"
            />
          </span>
          {`Glückwunsch! Es wurden ${data.maxVictoryStreak} Herausforderungen gesendet.`}
        </div>
      );
    const highIndex = data.highFinish.reduce((acc, element, index) => {
      if (Number(element) !== 0) {
        acc.push(index);
      }
      return acc;
    }, []);
    highIndex.map((val) => {
      toast(
        <div className="flex">
          <span>
            <img
              className="w-24"
              src={AchievementImages.FINISHINGACE[val]}
              alt="achievement-icon"
            />
          </span>
          {`Glückwunsch! Sie haben ein Finishing-Ace von ${AchievementVariables.FINISHINGACE[val]} erreicht.`}
        </div>
      );
      return true;
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    const updateResult = HandleResult.updateResult(
      allInitResult,
      totalResult,
      detailResult
    );
    if (updateResult) {
      const currentUser = JSON.parse(localStorage.getItem("authUser")).user
        .username;
        console.log('***', updateResult.find((val) => val.username === currentUser))
      handleAcievement(
        updateResult.find((val) => val.username === currentUser)
      );
      setIsInitLoading(true);
      try {
        await Promise.all(
          updateResult.map(async (val) => {
            await http.post("/result/post", val);
          })
        );
        navigate("/ranking");
      } catch (err) {
        toast("Beim Speichern der Daten ist ein Fehler aufgetreten");
      } finally {
        setIsInitLoading(false);
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
      <div className="mx-auto max-w-2xl p-8 lg:max-w-4xl lg:px-12">
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
            {isInitLoading ? (
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
                disabled={!totalResult || (isDetailLoading ? true : false)}
              >
                Speichern
              </button>
            )}
          </div>
        </form>

        {isDetailLoading ? (
          <div className="my-4">
            <Loading />
          </div>
        ) : (
          detailResult && <div></div>
        )}

        {isLoading ? (
          <div className="my-4">
            <Loading />
          </div>
        ) : (
          totalResult && (
            <div className="border p-4 rounded-md shadow shadow-md mt-4">
              <div className="flex space-x-4">
                {totalResult.users.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item}
                    </h5>
                  </div>
                ))}
              </div>
              {totalResult.mark && (
                <div className="flex flex-column mx-auto w-1/2 mt-4 bg-green-500 rounded-md px-4 py-1.5">
                  <div className="flex-1 text-white font-semibold text-2xl text-center">
                    {totalResult.mark.challenger}
                  </div>
                  <div className="flex-1 text-white font-semibold text-xl text-center">
                    Legs
                  </div>
                  <div className="flex-1 text-white font-semibold text-2xl text-center">
                    {totalResult.mark.receiver}
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {isLoading ? (
          <div className="my-4">
            <Loading />
          </div>
        ) : (
          totalResult && (
            <div className="border p-4 rounded-md shadow shadow-md mt-4">
              {totalResult.matchOption.map((val, index) => (
                <p key={index} className="font-normal text-lg mb-4">
                  {val}
                </p>
              ))}
              {totalResult.detail.map((item, index) => (
                <div key={index} className="flex flex-wrap">
                  {item.map((subItem, subIndex) => (
                    <p
                      key={subIndex}
                      className="w-1/3 mb-2 font-normal text-md"
                    >
                      {subItem}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Result;

import { useState, useEffect } from "react";
import http from "../../utility/http-client";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Result = ({ socket }) => {
  const navigate = useNavigate();
  const [resultUrl, setResultUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [allResult, setAllResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);
  const [userResult, setUserResult] = useState(null);
  const [detailResult, setDetailResult] = useState(null);
  const [initResult, setInitResult] = useState(null);

  useEffect(() => {
    userResult && fetchResult();
  }, [userResult]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await http.post("/result/get", {
        url: resultUrl,
      });
      console.log("Result-->>>", res.data);
      setAllResult(res.data.allResult);
      setTotalResult(res.data.totalResult);
      setUserResult(res.data.userResult);
      let matchDate = new Date(
        res.data.allResult[0].split(" ")[2].split(".").reverse().join("-")
      );

      let matchNo = [
        ...Array(
          Number(res.data.totalResult[0]) + Number(res.data.totalResult[1])
        ).keys(),
      ];

      let details =
        res.data.allResult.length === 44
          ? [...[...res.data.allResult].splice(2)]
          : [...[...res.data.allResult].splice(3)];

      let i = 0,
        wDetails = [],
        lDetails = [];

      while (i < details.length) {
        wDetails.push(details[i]);
        lDetails.push(details[i + 2]);
        i += 3;
      }

      getDetailResult(matchNo);

      // storeResult(data);

      // console.log("Result-handle--->>>", matchDate);
    } catch (err) {
      console.log(err);
      setAllResult(null);
      setTotalResult(null);
      setUserResult(null);
      toast(
        "Beim Abrufen der Match-Ergebnisse ist ein Fehler aufgetreten. Bitte versuche es erneut"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const storeResult = async (data) => {
    try {
      await http.post("/result/post", data);
      toast(
        `Die Spielergebnisse von ${data.username} wurden erfolgreich gespeichert`
      );
      navigate("/ranking");
    } catch (err) {
      toast("Beim Speichern der Daten ist ein Fehler aufgetreten");
    }
  };

  const fetchResult = async () => {
    setIsInitLoading(true);
    let temp = [];
    try {
      await Promise.all(
        userResult.map(async (val) => {
          const res = await http.post("/result/fetch", {
            username: val.trim(),
          });
          temp.push(res.data);
        })
      );
      setInitResult(temp);

      console.log("--------Init--result-------", temp);
    } catch (err) {
      setInitResult(null);
      console.log("-------Init--err---", err);
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

  const getHighFinish = (firstArray, secondArray) => {
    const counts = [];

    // Create a map to store the counts of elements in the first array
    const map = new Map();
    for (const num of firstArray) {
      if (map.has(num)) {
        map.set(num, map.get(num) + 1);
      } else {
        map.set(num, 1);
      }
    }

    // Count the occurrences of elements from the second array
    for (const num of secondArray) {
      counts.push(map.get(num) || 0);
    }

    return counts;
  };

  const onSave = async (e) => {
    e.preventDefault();
    let user1 = [],
      user2 = [],
      user1_cnt26 = 0,
      user2_cnt26 = 0,
      user1_cntHigh = [],
      user2_cntHigh = [];

    const highMarks = [170, 167, 164, 161, 160, 158];
    for (let i = 157; i > 100; i--) {
      highMarks.push(i);
    }

    // init result clone
    let user1Init = [
      ...initResult.filter((val) => val.username === userResult[0]),
    ][0];
    let user2Init = [
      ...initResult.filter((val) => val.username === userResult[1]),
    ][0];

    detailResult &&
      detailResult.map((item) => {
        item.subResult.map((val, index) => {
          index % 4 < 1
            ? user1.push(Number(val))
            : index % 4 > 2 && user2.push(Number(val));
          return true;
        });
        return true;
      });

    let user1Update = { ...user1Init },
      user2Update = { ...user2Init };

    // 26 master calculate
    user1_cnt26 = user1.filter((val) => val === 26).length;
    user2_cnt26 = user2.filter((val) => val === 26).length;
    // high finish
    user1_cntHigh = getHighFinish(user1, highMarks);
    user2_cntHigh = getHighFinish(user2, highMarks);

    // result update
    user1Update = {
      ...user1Update,
      master26: user1Init.master26 + user1_cnt26,
      highFinish:
        user1Init.highFinish.length === 0
          ? user1_cntHigh
          : user1Init.highFinish.map(
              (val, index) => val + user1_cntHigh[index]
            ),
      currentVictoryStreak:
        totalResult[0] > totalResult[1]
          ? user1Init.previousWin === true
            ? user1Init.currentVictoryStreak + 1
            : 1
          : 0,
      previousWin: totalResult[0] > totalResult[1] ? true : false,
      totalWinNo:
        totalResult[0] > totalResult[1]
          ? user1Init.totalWinNo + 1
          : user1Init.totalWinNo,
      level:
        user1Init.level > user2Init.level
          ? totalResult[0] < totalResult[1]
            ? user1Init.level - 1
            : user1Init.level
          : totalResult[0] > totalResult[1]
          ? user1Init.level + 1
          : user1Init.level,
    };
    user1Update = {
      ...user1Update,
      maxVictoryStreak:
        user1Update.currentVictoryStreak > user1Init.maxVictoryStreak
          ? user1Update.currentVictoryStreak
          : user1Init.maxVictoryStreak,
    };
    storeResult(user1Update);
    user2Update = {
      ...user2Update,
      master26: user2Init.master26 + user2_cnt26,
      highFinish:
        user2Init.highFinish.length === 0
          ? user2_cntHigh
          : user2Init.highFinish.map(
              (val, index) => val + user2_cntHigh[index]
            ),
      currentVictoryStreak:
        totalResult[0] < totalResult[1]
          ? user2Init.previousWin === true
            ? user2Init.currentVictoryStreak + 1
            : 1
          : 0,
      previousWin: totalResult[0] < totalResult[1] ? true : false,
      totalWinNo:
        totalResult[0] < totalResult[1]
          ? user2Init.totalWinNo + 1
          : user2Init.totalWinNo,
      level:
        user1Init.level < user2Init.level
          ? totalResult[0] > totalResult[1]
            ? user2Init.level - 1
            : user2Init.level
          : totalResult[0] < totalResult[1]
          ? user2Init.level + 1
          : user2Init.level,
    };
    user2Update = {
      ...user2Update,
      maxVictoryStreak:
        user2Update.currentVictoryStreak > user2Init.maxVictoryStreak
          ? user2Update.currentVictoryStreak
          : user2Init.maxVictoryStreak,
    };
    storeResult(user2Update);

    console.log("::user1-->>", user1Update, "::user2-->>", user2Update);
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
                disabled={isDetailLoading ? true : false}
              >
                Speichern
              </button>
            )}
          </div>
        </form>

        {isLoading ? (
          <div className="my-4">
            <Loading />
          </div>
        ) : (
          userResult && (
            <div className="border p-4 rounded-md shadow shadow-md mt-4">
              <div className="flex space-x-4">
                {userResult.map((item, index) => (
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
              {totalResult && (
                <div className="flex flex-column mx-auto w-1/2 mt-4 bg-green-500 rounded-md px-4 py-1.5">
                  <div className="flex-1 text-white font-semibold text-2xl text-center">
                    {totalResult[0]}
                  </div>
                  <div className="flex-1 text-white font-semibold text-xl text-center">
                    Legs
                  </div>
                  <div className="flex-1 text-white font-semibold text-2xl text-center">
                    {totalResult[1]}
                  </div>
                </div>
              )}
            </div>
          )
        )}

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
          allResult && (
            <div className="border p-4 rounded-md shadow shadow-md mt-4">
              <p className="font-normal text-lg mb-4">{allResult[0]}</p>
              <p className="font-normal text-lg mb-4">{allResult[1]}</p>
              {allResult.length === 44 ? (
                <div className="flex flex-wrap">
                  {[...allResult].slice(2).map((item, index) => (
                    <p key={index} className="w-1/3 mb-2 font-normal text-md">
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <p className="font-normal text-lg mb-4">{allResult[2]}</p>
                  <div className="flex flex-wrap">
                    {[...allResult].slice(3).map((item, index) => (
                      <p key={index} className="w-1/3 mb-2 font-normal text-md">
                        {item}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Result;

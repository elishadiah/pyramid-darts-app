import { useState } from "react";
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
      let winnerUser, winnerResult, lostUser, lostResult;
      if (res.data.totalResult[0] > res.data.totalResult[1]) {
        winnerUser = res.data.userResult[0];
        winnerResult = res.data.totalResult[0];
        lostUser = res.data.userResult[1];
        lostResult = res.data.totalResult[1];
      } else {
        winnerUser = res.data.userResult[1];
        winnerResult = res.data.totalResult[1];
        lostUser = res.data.userResult[0];
        lostResult = res.data.totalResult[0];
      }

      let matchNo = [
        ...Array(Number(winnerResult) + Number(lostResult)).keys(),
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

      const data = {
        date: new Date(matchDate),
        winner: {
          username: winnerUser,
          result: winnerResult,
          avg: wDetails[0],
          firstAvg: wDetails[1],
          doubles: wDetails[2],
          highestFinish: wDetails[3],
          shortestLeg: wDetails[4],
          max: wDetails[5],
          plus171: wDetails[6],
          plus140: wDetails[7],
          plus100: wDetails[8],
          plus80: wDetails[9],
          plus60: wDetails[10],
          plus40: wDetails[11],
          plus20: wDetails[12],
          minus20: wDetails[13],
        },
        lost: {
          username: lostUser,
          result: lostResult,
          avg: lDetails[0],
          firstAvg: lDetails[1],
          doubles: lDetails[2],
          highestFinish: lDetails[3],
          shortestLeg: lDetails[4],
          max: lDetails[5],
          plus171: lDetails[6],
          plus140: lDetails[7],
          plus100: lDetails[8],
          plus80: lDetails[9],
          plus60: lDetails[10],
          plus40: lDetails[11],
          plus20: lDetails[12],
          minus20: lDetails[13],
        },
      };

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
    } catch (err) {
      toast("Beim Speichern der Daten ist ein Fehler aufgetreten");
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

  const fetchResult = async (username) => {
    try {
      const res = await http.post("/result/fetch", { username: username.trim() });
      console.log("fetch-result--1-->>>", res.data);
    } catch (err) {
      toast(err);
    }
  }

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

    detailResult.map((item) => {
      item.subResult.map((val, index) => {
        index % 4 < 1
          ? user1.push(Number(val))
          : index % 4 > 2 && user2.push(Number(val));
        return true;
      });
      return true;
    });

    user1_cnt26 = user1.filter((val) => val === 26).length;
    user2_cnt26 = user2.filter((val) => val === 26).length;

    user1_cntHigh = getHighFinish(user1, highMarks);
    user2_cntHigh = getHighFinish(user2, highMarks);

    console.log(
      "Test---->>>",
      user1,
      "::user1-->>",
      user1_cntHigh,
      "::user2-->>",
      user2_cntHigh
    );
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
            <button
              onClick={onSave}
              className="flex-1 bg-green-600 text-white p-2 rounded-md font-semibold text-lg"
            >
              Speichern
            </button>
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

        {isDetailLoading ? (
          <div className="my-4">
            <Loading />
          </div>
        ) : (
          detailResult && <div>Detail</div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Result;

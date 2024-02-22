import { useState } from "react";
import http from "../../utility/http-client";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Result = () => {
  const navigate = useNavigate();
  const [resultUrl, setResultUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allResult, setAllResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);
  const [userResult, setUserResult] = useState(null);

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
      toast("Erhalten Sie die Spielergebnisse erfolgreich.");
    } catch (err) {
      console.log(err);
      setAllResult(null);
      setTotalResult(null);
      setUserResult(null);
      toast("Beim Abrufen der Match-Ergebnisse ist ein Fehler aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setResultUrl(e.target.value);
  };
  return (
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
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <div className="flex space-x-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white p-2 rounded-md font-semibold text-lg"
            >
              Laden
            </button>
            <button
              onClick={() => navigate("/ranking")}
              className="flex-1 bg-green-600 text-white p-2 rounded-md font-semibold text-lg"
            >
              Zurück
            </button>
          </div>
        )}
      </form>

      {userResult && (
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
      )}

      {allResult && (
        <div className="border p-4 rounded-md shadow shadow-md mt-4">
          <p className="font-normal text-lg mb-4">{allResult[0]}</p>
          <p className="font-normal text-lg mb-4">{allResult[1]}</p>
          <div className="flex flex-wrap">
            {allResult.slice(2).map((item, index) => (
              <p key={index} className="w-1/3 mb-2 font-normal text-md">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Result;

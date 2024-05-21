import Loading from "../Loading";

const TopFightResult = ({ isLoading, result }) => {
  return (
    <div>
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
        <div className="border p-4 rounded-md shadow shadow-md mt-12">
          <div className="flex space-x-4">
            <div className="flex-1 bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-white text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {result?.user1?.name}
              </h5>
            </div>
            <div className="flex-1 bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-white text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {result?.user2?.name}
              </h5>
            </div>
          </div>
          <div className="flex bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end flex-column mx-auto w-1/2 mt-4 bg-green-500 rounded-md px-4 py-1.5">
            <div className="flex-1 text-white font-semibold text-2xl text-center">
              {result?.user1?.won}
            </div>
            <div className="flex-1 text-white font-semibold text-xl text-center">
              Legs
            </div>
            <div className="flex-1 text-white font-semibold text-2xl text-center">
              {result?.user2?.won}
            </div>
          </div>
          <div className="bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end p-4 my-4 rounded-lg">
            <p className="font-normal text-white text-lg p-2">
              <span className="font-semibold">Match start: </span>
              {new Date(result?.begin).toLocaleString()}
            </p>
            <div className="flex justify-around text-white p-2">
                <p className="font-semibold">{result?.user1?.avg}</p>
                <p>Avg</p>
                <p className="font-semibold">{result?.user2?.avg}</p>
            </div>
            <div className="flex justify-around text-white p-2">
                <p className="font-semibold">{result?.user1?.avg}</p>
                <p>Avg</p>
                <p className="font-semibold">{result?.user2?.avg}</p>
            </div>
            <div className="flex justify-around text-white p-2">
                <p className="font-semibold">{result?.user1?.avg}</p>
                <p>Avg</p>
                <p className="font-semibold">{result?.user2?.avg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopFightResult;

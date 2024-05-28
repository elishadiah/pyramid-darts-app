import SpinnerLoading from "../SpinnerLoading";

const TopResultForm = ({ isLoading, onChange, handleSubmit, handleSave }) => {
  return (
    <form
      className="bg-gradient-to-tl from-light-card-start to-light-card-end dark:from-dark-card-start dark:to-dark-card-end border p-4 rounded-lg shadow shadow-md"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="result"
        className="block text-lg text-left text-white font-semibold leading-6 mb-2 text-gray-900 dark:text-white"
      >
        Lidarts-URL
      </label>
      <input
        type="text"
        name="result"
        id="result"
        placeholder="https://lidarts.org/game/ABCD1234"
        className="block w-full rounded-md border-0 py-1.5 px-4 text-lg dark:text-white font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 dark:bg-white/5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 focus-border-none focus-outline-none"
        onChange={onChange}
      />
      <div className="flex flex-wrap gap-4 mt-2">
        <button
          type="submit"
          className="flex-1 relative inline-block font-mono text-xl text-white font-sans font-semibold bg-green-400 bg-gradient-to-tl from-green-400 from-0 to-green-800 to-[74%] border-none rounded-md px-6 py-2.5 transition-all outline-none shadow-inner z-10 after:absolute after:content-[''] after:w-full after:h-0 after:bottom-0 after:left-0 after:rounded-md after:z-[-1] after:bg-green-600 after:bg-gradient-to-tl after:from-green-600 after:from-0 after:to-green-400 after:to-[74%] after:shadow-md after:transition-all hover:text-white hover:after:top-0 hover:after:h-full active:top-1 disabled:opacity-50 disabled:bg-green-400"
          disabled={isLoading ? true : false}
        >
          Laden
        </button>
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <button
            onClick={(e) => {
              handleSave();
              e.preventDefault();
            }}
            type="submit"
            className="flex-1 relative inline-block font-mono text-xl text-white font-sans font-semibold bg-green-400 bg-gradient-to-tl from-green-400 from-0 to-green-800 to-[74%] border-none rounded-md px-6 py-2.5 transition-all outline-none shadow-inner z-10 after:absolute after:content-[''] after:w-full after:h-0 after:bottom-0 after:left-0 after:rounded-md after:z-[-1] after:bg-green-600 after:bg-gradient-to-tl after:from-green-600 after:from-0 after:to-green-400 after:to-[74%] after:shadow-md after:transition-all hover:text-white hover:after:top-0 hover:after:h-full active:top-1"
            disabled={isLoading ? true : false}
          >
            Speichern
          </button>
        )}
      </div>
    </form>
  );
};

export default TopResultForm;

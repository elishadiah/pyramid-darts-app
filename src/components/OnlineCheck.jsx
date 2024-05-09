const OnlineCheck = ({ isOnlineShow, setIsOnlineShow }) => {
  const onChange = () => {
    setIsOnlineShow(!isOnlineShow);
  };

  return (
    <div className="flex items-center p-2 mb-2 border border-gray-200 rounded">
      <input
        id="checked-checkbox"
        type="checkbox"
        checked={isOnlineShow}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="checked-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Show only online players
      </label>
    </div>
  );
};

export default OnlineCheck;

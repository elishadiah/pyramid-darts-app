const UserAvatar = ({ avatar, name }) => (
  <div className="flex flex-col items-center justify-center border border-yellow-600 bg-gradient-to-tr from-[#0c0c0c] to-[#0f971c] dark:from-dark-card-start dark:to-dark-card-end p-2 rounded-md">
    {avatar ? (
      <img className="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
    ) : (
      <p className="font-bold text-3xl w-12 h-12 rounded-full border flex items-center justify-center bg-white dark:bg-gray-800 text-black dark:text-white">
        {name.charAt(0).toUpperCase()}
      </p>
    )}
    <p className="text-white font-semibold ">{name}</p>
  </div>
);

export default UserAvatar;

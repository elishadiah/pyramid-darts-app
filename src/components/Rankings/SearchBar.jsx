import { useState, useCallback, useMemo } from "react";
import SearchComponent from "../SearchComponent";

const SearchBar = ({
  players = [],
  onPlayerClick,
  connectedUsers = [],
  isOnlineShow,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((payload) => {
    setSearchTerm(payload);
  }, []);

  const filteredPlayers = useMemo(() => {
    const connectedUsernames = connectedUsers
      .filter((user) => user?.connected)
      .map((user) => user.username.toLowerCase());
    const playersToFilter = isOnlineShow
      ? players.filter((player) =>
          connectedUsernames.includes(player.username.toLowerCase())
        )
      : players;
    return playersToFilter.filter((player) =>
      player.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, players, connectedUsers, isOnlineShow]);

  return (
    <div className="w-full">
      <SearchComponent onSearchFunc={handleSearch} />
      <div className="py-4 my-4 custom-scrollbar overflow-y-auto max-h-30-vh lg:max-h-62-vh bg-white dark:bg-gray-800 border rounded-md">
        <ul className="bg-white dark:bg-gray-800">
          {filteredPlayers.map((player, index) => (
            <li
              key={index}
              className="text-left px-4 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => onPlayerClick(player)}
            >
              <a className="font-semibold text-lg" href={`#${player?._id}`}>
                {player.username?.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

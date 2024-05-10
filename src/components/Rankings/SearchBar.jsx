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
      <div className="py-4 overflow-y-auto max-h-30-vh lg:max-h-62-vh my-4">
        <ul>
          {filteredPlayers.map((player, index) => (
            <li
              key={index}
              className="text-left pl-2 bg-white"
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

import { useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../SearchComponent";

const SearchBar = ({ players, onPlayerClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchFunc = (payload) => {
    setSearchTerm(payload);
  };

  const filteredPlayers = players
    ? players.filter((player) =>
        player.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <div className="w-full">
      <SearchComponent onSearchFunc={onSearchFunc} />
      <div className="py-4">
        <ul>
          {filteredPlayers.map((player) => (
            <li
              key={player._id}
              className="text-left pl-2"
              onClick={() => onPlayerClick(player)}
            >
              <a className="font-semibold text-lg" href={`#${player._id}`}>
                {player.username}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

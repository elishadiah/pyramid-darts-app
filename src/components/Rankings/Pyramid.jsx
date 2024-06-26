import { useMemo } from "react";
import Card from "./Card";
import authService from "../../services/auth.service";
import images from "../../helper/images";

const Pyramid = ({
  players,
  selectedPlayer,
  connectedUsers,
  onlineShow,
  imgSize,
  sendQuickFight,
  sendScheduledFight,
}) => {
  const currentUser = useMemo(() => authService.getAuthUser().user, []);

  const isAvailable = (player) => {
    const currentPlayer = players.find((val) =>
      val.username?.toLowerCase().includes(currentUser.username?.toLowerCase())
    );
    if (player.level < currentPlayer.level) return false;
    else if (player.level === currentPlayer.level + 1) return true;
    else if (player.level > currentPlayer.level + 1) return false;

    const availablePositionNo = Math.pow(2, 7 - currentPlayer.level);
    const currentAbovePlayersNo = players.filter(
      (val) => val.level === currentPlayer.level + 1
    ).length;
    const rowSpotNo = availablePositionNo - currentAbovePlayersNo;
    return rowSpotNo > 0;
  };

  const renderPlayer = (player, available) => {
    const isHighlighted = player === selectedPlayer;

    return (
      <Card
        key={player._id}
        player={player}
        available={available}
        isHighlighted={isHighlighted}
        sendQuickFight={sendQuickFight}
        sendScheduledFight={sendScheduledFight}
        connectedUsers={connectedUsers}
        onlineShow={onlineShow}
        imgSize={Number(imgSize)}
        // occupied={false}
      ></Card>
    );
  };

  const renderRow = (players, rowNumber) => {
    const rowLength = Math.pow(2, 7 - rowNumber + 2);

    const renderedPlayers = players
      .filter((player) => player.level === rowNumber - 1)
      .map((player) => renderPlayer(player, isAvailable(player)));

    const rowSpots = rowLength - renderedPlayers.length;
    for (let i = 0; i < rowSpots; i++) {
      renderedPlayers.push(
        <div
          key={`spot-${rowNumber}-${i}`}
          className={`bg-gray-300 dark:bg-gray-900 rounded-full m-2`}
          style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
        />
      );
    }
    return (
      <div className="flex flex-wrap relative space-x-2 justify-center items-center my-4">
        {rowNumber < 4 ? (
          <div className="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-white bg-green-600 border-white rounded-full p-2 -top-8 end-2">
            {8 - rowNumber}
          </div>
        ) : (
          <div className="absolute inline-flex items-center justify-center w-8 h-8 font-bold text-white border-white rounded-full -top-8 end-2">
            <img src={images.RANKINGMARK[7 - rowNumber]} alt="ranking-mark" />
          </div>
        )}
        {renderedPlayers}
      </div>
    );
  };

  const renderPyramid = () => {
    const rows = [];

    for (let i = 7; i >= 1; i--) {
      rows.push(renderRow(players, i));
    }

    return rows;
  };

  return renderPyramid();
};

export default Pyramid;

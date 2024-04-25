import Card from "./Card";

const Pyramid = ({
  players,
  selectedPlayer,
  connectedUsers,
  onlineShow,
  imgSize,
  sendQuickFight,
  sendScheduledFight,
}) => {
  const isAvailable = (player) => {
    const currentUser = JSON.parse(localStorage.getItem("authUser")).user;
    const currentPlayer = players.find((val) =>
      val.username.includes(currentUser.username)
    );
    if (player.level < currentPlayer.level) return false;
    else if (player.level === currentPlayer.level + 1) return true;
    else if (player.level > currentPlayer.level + 1) return false;
    else {
      const availablePositionNo = Math.pow(2, 7 - currentPlayer.level);
      const currentAbovePlayersNo = players.filter(
        (val) => val.level === currentPlayer.level + 1
      ).length;
      const rowSpotNo = availablePositionNo - currentAbovePlayersNo;
      if (rowSpotNo > 0) return true;
      else return false;
    }
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
        // occupied={false}
      >
        {player.avatar ? (
          <img
            className={`mx-auto flex-shrink-0 rounded-full`}
            src={player.avatar}
            style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
            alt="user avatar"
          ></img>
        ) : (
          <div
            className={`mx-auto flex items-center justify-center flex-shrink-0 bg-green-200 rounded-full text-xl font-bold`}
            style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
          >
            {player.username.toLocaleUpperCase().charAt(0)}
          </div>
        )}
      </Card>
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
          className={`bg-gray-300 rounded-full m-2`}
          style={{ width: `${imgSize * 4}px`, height: `${imgSize * 4}px` }}
        />
      );
    }
    return (
      <div className="flex flex-wrap relative space-x-2 justify-center my-4">
        <div className="absolute inline-flex items-center justify-center w-6 h-6 font-bold text-white bg-green-600 border-white rounded-full p-2 -top-8 end-2">
          {8 - rowNumber}
        </div>
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

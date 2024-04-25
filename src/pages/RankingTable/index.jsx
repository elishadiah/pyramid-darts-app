import { useState, useEffect } from "react";
import Header from "../../components/Header";
import http from "../../helper/http-client";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";

const RankingTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/result/fetch-all");
      setResult(
        res.data.map((val, index) => ({
          id: val._id,
          ranking: val.level,
          avatar: val.avatar,
          name: val.username,
          breakfast: val.master26,
          streak: val.maxVictoryStreak,
          friendly: val.sentTotalChallengeNo,
        }))
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "Ranking",
      selector: (row) => row.ranking,
      sortable: true,
      center: "true",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Username",
      selector: (row) => row.avatar,
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center">
            {row.avatar ? (
              <img
                className="w-8 h-8 rounded-full border"
                src={row.avatar}
                alt="avatar"
              />
            ) : (
              <div className="w-8 h-8 rounded-full border text-center flex items-center justify-center font-bold text-2xl">
                {row.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="font-md">{row.name}</div>
        </div>
      ),
    },
    {
      name: "Breakfast",
      selector: (row) => row.breakfast,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Vicotry Streak",
      selector: (row) => row.streak,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Friendly Challenger",
      selector: (row) => row.friendly,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <div className="relative sm:pb-24 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={7} />
      <div className="p-8">
        <DataTable
          title={<div className="text-4xl font-bold mb-4">Ranking</div>}
          columns={columns}
          data={result}
          progressPending={isLoading}
          customStyles={customStyles}
          progressComponent={<Loading />}
          pagination
          highlightOnHover
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </div>
  );
};

export default RankingTable;

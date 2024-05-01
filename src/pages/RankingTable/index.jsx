import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import http from "../../helper/http-client";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";
import { transformTableData } from "../../helper/helper";

const RankingTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const fetchResult = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/result/fetch-all");
      setResult(transformTableData(res.data));
      console.log("--------Init-Ranking--table--result-------", res.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  const handleProfile = (username) => {
    window.location.href = `/profile/${username}`;
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
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleProfile(row.name)}
        >
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
      name: "Dart Enthusiast",
      selector: (row) => row.dart,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Consistent Scorer",
      selector: (row) => row.consistentScorer,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Iron Dart",
      selector: (row) => row.ironDart,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Monthly Maestro",
      selector: (row) => row.monthlyMaestro,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Pyramid Protector",
      selector: (row) => row.pyramidProtector,
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
    {
      name: "Ready For It",
      selector: (row) => row.ready,
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

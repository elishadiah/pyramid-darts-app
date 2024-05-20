import { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import http from "../../helper/http-client";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";
import { transformTableData } from "../../helper/helper";
import Layout from "../../components/Layout";

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
      name: "Victory Streak(Lifetime)",
      selector: (row) => row.streak,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Victory Streak(Season)",
      selector: (row) => row.seasonStreak,
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
    {
      name: "Grand Master(Leg)",
      selector: (row) => row.grandMaster.leg,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Grand Master(Fight)",
      selector: (row) => row.grandMaster.match,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Challenge Conqueror(Lifetime)",
      selector: (row) => row.challengeConqueror.lifetime,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Challenge Conqueror(Season)",
      selector: (row) => row.challengeConqueror.lifetime,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Pyramid Climber(Lifetime)",
      selector: (row) => row.pyramidClimber.lifetime,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Pyramid Climber(Season)",
      selector: (row) => row.pyramidClimber.season,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Master 180(Lifetime)",
      selector: (row) => row.master180.lifetime,
      sortable: true,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Master 180(Season)",
      selector: (row) => row.master180.season,
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
    <Layout currentNo={7}>
      <div className="p-8">
        <DataTable
          title={<div className="text-4xl font-bold mb-4">Ranking</div>}
          columns={columns}
          data={result}
          progressPending={isLoading}
          customStyles={customStyles}
          progressComponent={
            <div className="flex flex-col w-full gap-4">
              <Loading />
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </div>
          }
          pagination
          highlightOnHover
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </Layout>
  );
};

export default RankingTable;

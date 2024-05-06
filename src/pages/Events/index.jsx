import { useState, useEffect, useCallback, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import http from "../../helper/http-client";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";
import CustomInputComponent from "../../components/Input";

const GlobalEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterStr, setFilterStr] = useState({ content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = useCallback((e) => {
    setFilterStr(e);
  }, []);

  const filterEvents = useMemo(
    () =>
      events?.items
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((val) => ({
          id: val._id,
          date: new Date(val.date).toLocaleString(),
          user: val?.user,
          target: val?.targetUser,
          link: val?.link,
          type: val?.eventType,
        }))
        .filter(
          (val) =>
            val?.user
              .toLowerCase()
              .includes(filterStr?.content.toLowerCase()) ||
            val?.target.toLowerCase().includes(filterStr?.content.toLowerCase())
        ),
    [filterStr, events]
  );

  const totalItems = useMemo(() => events?.totalItems, [events]);

  const getEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.get(
        `/event/get?page=${page}&limit=${rowsPerPage}`
      );
      setEvents(res.data);
      console.log("Events-->>", res.data);
    } catch (err) {
      console.log("Event-err-->>", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    getEvents();
  }, [getEvents, page, rowsPerPage]);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      grow: 1,
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Content",
      selector: (row) => row.id,
      sortable: true,
      grow: 4,
      cell: (row) => (
        <div>
          {row.type === "login" ? (
            <Link to={`/profile/${row.user}`}>
              {row.user}&nbsp;logged&nbsp;in
            </Link>
          ) : row.type === "logout" ? (
            <Link to={`/profile/${row.user}`}>
              {row.user}&nbsp;logged&nbsp;out
            </Link>
          ) : row.type === "register" ? (
            <Link to={`/profile/${row.user}`}>
              {row.user}&nbsp;registered&nbsp;in the system
            </Link>
          ) : row.type === "match" ? (
            <>
              <Link to={`/profile/${row.user}`}>
                {row.user}&nbsp;played against&nbsp;
              </Link>
              <Link to={`/profile/${row?.target}`}>{row?.target}&nbsp;</Link>
              <a href={row?.link} target="_blank" rel="noopener noreferrer">
                (&nbsp;match overview:&nbsp;{row?.link} )
              </a>
            </>
          ) : (
            <>
              <Link to={`/profile/${row.user}`}>{row.user}</Link>
              &nbsp;sent {row?.type} challenge to&nbsp;
              <Link to={`/profile/${row?.target}`}>{row?.target}</Link>
            </>
          )}
        </div>
      ),
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

  console.log("Total-->>", totalItems, events?.totalItems);

  const handlePage = (page) => setPage(page);

  const handleRowsPerPage = (page) => setRowsPerPage(page);

  return (
    <div>
      <Header current={6} />
      <div className="py-4 px-8">
        <div className="md:w-2/5 lg:w-1/5 ml-auto mb-8">
          <CustomInputComponent
            name="content"
            type="text"
            placeholder="Input search word"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleFilter}
          />
        </div>
        <DataTable
          title={<div className="text-4xl font-bold mb-4">Events</div>}
          columns={columns}
          data={filterEvents}
          progressPending={isLoading}
          customStyles={customStyles}
          progressComponent={<Loading />}
          pagination
          paginationServer
          paginationTotalRows={totalItems}
          onChangePage={handlePage}
          onChangeRowsPerPage={handleRowsPerPage}
        />
      </div>
    </div>
  );
};

export default GlobalEvents;

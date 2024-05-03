import { useState, useEffect, useCallback, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import http from "../../helper/http-client";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";
import CustomInputComponent from "../../components/Input";

const GlobalEvents = () => {
  const [events, setEvents] = useState([]);
  const [filterStr, setFilterStr] = useState({ content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = useCallback((e) => {
    setFilterStr(e);
  }, []);

  const filterEvents = useMemo(
    () =>
      events?.filter((val) =>
        val.content.toLowerCase().includes(filterStr?.content.toLowerCase())
      ),
    [filterStr, events]
  );

  const getEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/event/get");
      setEvents(
        res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((val) => ({
            id: val._id,
            date: new Date(val.createdAt).toLocaleString(),
            content: val.content,
          }))
      );
      console.log("Events-->>", res.data);
    } catch (err) {
      console.log("Event-err-->>", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

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
      selector: (row) => row.content,
      sortable: true,
      grow: 4,
      cell: (row) => <div>{row.content}</div>,
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
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </div>
  );
};

export default GlobalEvents;

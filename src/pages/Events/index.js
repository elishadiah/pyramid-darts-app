import { useState, useEffect } from "react";
import http from "../../utility/http-client";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";

const GlobalEvents = ({ socket }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getEvents();
  }, []);

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

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/event/get");
      setEvents(
        res.data.map((val) => ({
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
  };
  return (
    <div>
      <Header current={6} socket={socket} />
      <div className="py-4 px-8">
        <DataTable
          title={<div className="text-4xl font-bold mb-4">Events</div>}
          columns={columns}
          data={events}
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

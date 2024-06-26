import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import http from "../../helper/http-client";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("/schedule/fetch-all");
      console.log(
        "Schedule-->>",
        res.data,
      );
      const tmp = res.data.map((val) => ({
        id: val._id,
        title: `${val?.challenger} - ${val?.receiver}`,
        start: new Date(val?.date),
        end: addMinutes(val.date, 60),
      }));
      setEvents(tmp);
    } catch (err) {
      console.log("fetch-schedule--err-->>", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addMinutes = (date, minutes) => {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(dateCopy.getMinutes() + minutes);
    return dateCopy;
  };

  const localizer = momentLocalizer(moment);

  return (
    <Layout currentNo={5}>
      <div className="my-20">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : (
          <div className="py-8 dark:text-white lg:px-12">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Schedule;

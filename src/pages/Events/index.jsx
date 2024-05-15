import { useState, useEffect, useCallback, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import http from "../../helper/http-client";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import Loading from "../../components/Loading";
import CustomInputComponent from "../../components/Input";
import AchievementImages from "../../helper/images";
import CustomMultiSelect from "../../components/CustomMultiSelect";
import Constant from "../../helper/constant";
import ToolTip from "../../components/ToolTip/ToolTip";
import { convertAchievementName } from "../../helper/helper";

const columns = [
  {
    id: "date",
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
    sortable: false,
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
            <div>
              <Link to={`/profile/${row.user}`}>
                {row.user}&nbsp;played&nbsp;{row?.match?.user1Won} :&nbsp;
                {row?.match?.user2Won} against&nbsp;
              </Link>
              <Link to={`/profile/${row?.target}`}>{row?.target}&nbsp;</Link>
              <a
                href={row?.match?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                (&nbsp;match overview:&nbsp;{row?.match?.link} )
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              {row?.match?.achievements
                .filter(
                  (val) =>
                    !(
                      val?.name.includes("lifetime") ||
                      val?.name.includes("season")
                    )
                )
                .map((val, index) => (
                  <div key={index} className="flex relative gap-2 my-2">
                    <ToolTip text={convertAchievementName(val?.name)}>
                      <div className="flex items-center">
                        <img
                          className="w-8 h-6"
                          src={
                            AchievementImages[
                              val?.name.toUpperCase().split(".")[0]
                            ][val?.index]
                          }
                          alt="achievement-icon"
                        />
                      </div>
                    </ToolTip>
                    <p className="flex items-center">&#x2715;</p>
                    <p className="flex items-center">{val?.value}</p>
                  </div>
                ))}
              {row?.match?.achievements
                .filter((val) => val?.name.includes("lifetime"))
                .map((val, index) => (
                  <div key={index} className="flex gap-2 my-2">
                    <ToolTip text={convertAchievementName(val?.name)}>
                      <div className="flex items-center">
                        <img
                          className="w-8 h-6"
                          src={
                            AchievementImages[
                              val?.name.toUpperCase().split(".")[0]
                            ][val?.index]
                          }
                          alt="achievement-icon"
                        />
                      </div>
                    </ToolTip>
                    <p className="flex items-center">&#x2715;</p>
                    <p className="flex items-center">{val?.value}</p>
                  </div>
                ))}
              {row?.match?.achievements
                .filter((val) => val?.name.includes("season"))
                .map((val, index) => (
                  <div key={index} className="flex gap-2 my-2">
                    <ToolTip text={convertAchievementName(val?.name)}>
                      <div className="flex items-center">
                        <img
                          className="w-8 h-6"
                          src={
                            AchievementImages[
                              val?.name
                                .toUpperCase()
                                .replace("SEASON", "")
                                .split(".")[0]
                            ][val?.index]
                          }
                          alt="achievement-icon"
                          title={convertAchievementName(val?.name)}
                        />
                      </div>
                    </ToolTip>
                    <p className="flex items-center">&#x2715;</p>
                    <p className="flex items-center">{val?.value}</p>
                  </div>
                ))}
            </div>
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

const GlobalEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortObj, setSortObj] = useState({
    sortField: "date",
    sortDirection: "desc",
  });
  const [isOpenFilterMenu, setIsOpenFilterMenu] = useState(false);
  const [selectedFilterItems, setSelectedFilterItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [filterStr, setFilterStr] = useState({ user: "" });

  const filterEvents = useMemo(
    () =>
      events?.items?.map((val) => ({
        id: val._id,
        date: new Date(val.date).toLocaleString(),
        user: val?.user,
        target: val?.targetUser,
        match: val?.match,
        type: val?.eventType,
      })),
    [events]
  );

  console.log("Filter--Events-->>", filterEvents);

  const totalItems = useMemo(() => events?.totalItems, [events]);

  useEffect(() => {
    setSelectedFilterItems(
      Constant.eventFilterList.filter((item) => checkedItems[item.label])
    );
  }, [checkedItems]);

  const getEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams();
      selectedFilterItems.forEach((item) => {
        if (item.label !== "User") {
          searchParams.append("eventType", item.value);
        } else {
          searchParams.append("userName", item.value);
        }
      });
      const res = await http.get(
        `/event/get?page=${page}&limit=${rowsPerPage}&sortDirection=${
          sortObj.sortDirection
        }&${searchParams.toString()}`
      );
      setEvents(res.data);
      console.log("Events-->>", res.data);
    } catch (err) {
      console.log("Event-err-->>", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, rowsPerPage, sortObj, selectedFilterItems]);

  useEffect(() => {
    getEvents();
  }, [getEvents, page, rowsPerPage]);

  const handleFilter = useCallback(
    (e) =>
      setSelectedFilterItems((prev) => {
        const index = prev.findIndex((item) => item.label === "User");
        if (index !== -1) {
          prev[index].value = filterStr.user;
        } else {
          prev.push({ value: filterStr.user, label: "User" });
        }
        return [...prev];
      }),
    [filterStr]
  );

  const handlePage = useCallback((page) => {
    setPage(page);
  }, []);

  const handleRowsPerPage = useCallback((page) => {
    setRowsPerPage(page);
  }, []);

  const handleSort = useCallback((columns, sortDirection) => {
    console.log("Sort--columns-->>", columns, ":::-->>", sortDirection);
    setSortObj((prevState) => ({ ...prevState, sortDirection }));
  }, []);

  const handleFilterMenu = useCallback(() => {
    setIsOpenFilterMenu((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpenFilterMenu(false);
  }, []);

  const handleFilterCheck = useCallback((e) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [e.target.value]: e.target.checked,
    }));
  }, []);

  const handleFilterInput = useCallback((e) => {
    setFilterStr(e);
  }, []);

  return (
    <div>
      <Header current={6} />
      <div className="py-4 px-8">
        <div className="md:w-2/5 lg:w-1/3 ml-auto mb-8">
          <CustomMultiSelect
            isOpen={isOpenFilterMenu}
            selectedValue={selectedFilterItems}
            handleMenu={handleFilterMenu}
            closeDropdown={closeDropdown}
          >
            <ul>
              {Constant.eventFilterList.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item.label}
                    checked={checkedItems[item.label] || false}
                    onChange={handleFilterCheck}
                  />
                  {item.label}
                </li>
              ))}
              <li>
                <CustomInputComponent
                  name="user"
                  type="text"
                  placeholder="Input user name"
                  disabled={!checkedItems?.User}
                  icon={
                    <MagnifyingGlassIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={handleFilter}
                    />
                  }
                  onChange={handleFilterInput}
                />
              </li>
            </ul>
          </CustomMultiSelect>
        </div>
        <DataTable
          title={<div className="text-4xl font-bold mb-4">Events</div>}
          columns={columns}
          data={filterEvents}
          progressPending={isLoading}
          customStyles={customStyles}
          defaultSortFieldId="date"
          defaultSortAsc={false}
          progressComponent={<Loading />}
          pagination
          paginationServer
          paginationTotalRows={totalItems}
          onChangePage={handlePage}
          onChangeRowsPerPage={handleRowsPerPage}
          sortServer
          onSort={(columns, sortOrder) => handleSort(columns, sortOrder)}
        />
      </div>
    </div>
  );
};

export default GlobalEvents;

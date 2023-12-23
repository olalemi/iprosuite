import React, { createContext, useEffect, useState } from "react";
import { getAllLaunches } from "../api/LaunchService";

import {
  FilterState,
  LaunchData,
  UserContextType,
} from "../interfaces/UserProvider/IUserProvider";
type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  data: [],
  isLoading: true,
  setSortOrder: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,

  filter: {
    "2006-2010": false,
    "2011-2015": false,
    "2016-2020": false,
    "2021-present": false,
    success: false,
    failed: false,
  },
  toggleFilter: () => {},
  resetFilter: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState<LaunchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState<FilterState>({
    success: false,
    failed: false,
    "2006-2010": false,
    "2011-2015": false,
    "2016-2020": false,
    "2021-present": false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLaunches(currentPage, 10);

        if (!response) {
          return;
        }

        let sortedAndFilteredData = response.docs.map((launch: any) => ({
          missionName: launch.name,
          launchDate: launch.date_utc,
          launchId: launch.id,
          launchStatus: launch.success ? (
            <p className="text-green-500 font-bold">Success</p>
          ) : (
            <p className="text-red-500 font-bold">Failed</p>
          ),
          success: launch.success,
        }));

        setIsLoading(false);
        if (sortOrder === "recent") {
          sortedAndFilteredData.sort(
            (a: LaunchData, b: LaunchData) =>
              new Date(b.launchDate).getTime() -
              new Date(a.launchDate).getTime(),
          );
        }

        if (filter.success || filter.failed) {
          sortedAndFilteredData = sortedAndFilteredData.filter(
            (launch: LaunchData) => {
              if (filter.success && !launch.success) return false;
              if (filter.failed && launch.success) return false;
              return true;
            },
          );
        }

        if (
          filter["2006-2010"] ||
          filter["2011-2015"] ||
          filter["2016-2020"] ||
          filter["2021-present"]
        ) {
          sortedAndFilteredData = sortedAndFilteredData.filter(
            (launch: LaunchData) => {
              const launchYear = new Date(launch.launchDate).getFullYear();

              return (
                (filter["2006-2010"] &&
                  launchYear >= 2006 &&
                  launchYear <= 2010) ||
                (filter["2011-2015"] &&
                  launchYear >= 2011 &&
                  launchYear <= 2015) ||
                (filter["2016-2020"] &&
                  launchYear >= 2016 &&
                  launchYear <= 2020) ||
                (filter["2021-present"] && launchYear >= 2021)
              );
            },
          );
        }

        setTotalPages(response.totalPages);
        setData(sortedAndFilteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, [sortOrder, currentPage, totalPages, filter]);

  const toggleFilter = (type: keyof FilterState) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const resetFilter = () => {
    setFilter({
      success: false,
      failed: false,
      "2006-2010": false,
      "2011-2015": false,
      "2016-2020": false,
      "2021-present": false,
    });
  };

  return (
    <UserContext.Provider
      value={{
        data,
        isLoading,
        setSortOrder,
        currentPage,
        setCurrentPage,
        totalPages,
        toggleFilter,
        filter,
        resetFilter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

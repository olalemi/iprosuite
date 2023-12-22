import React, { createContext, useEffect, useState } from "react";
import { getAllLaunches } from "../api/LaunchService";

type Props = {
  children: React.ReactNode;
};

// TypeScript interface for launch data
interface LaunchData {
  missionName: string;
  launchDate: string;
  launchStatus: string;
  launchId: string;
}

interface UserContextType {
  data: LaunchData[];
  isLoading: boolean;
  setSortOrder: (order: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const UserContext = createContext<UserContextType>({
  data: [],
  isLoading: true,
  setSortOrder: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 0,
});

const UserProvider = ({ children }: Props) => {
  const [data, setData] = useState<LaunchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLaunches(currentPage, 10);

        if (!response) {
          return;
        }

        const slicedResponse = response.docs.map((launch: any) => ({
          missionName: launch.name,
          launchDate: launch.date_utc,
          launchId: launch.id,
          launchStatus: launch.success ? (
            <p className="text-green-500 font-bold">Success</p>
          ) : (
            <p className="text-red-500 font-bold">Failed</p>
          ),
        }));
        setIsLoading(false);

        if (sortOrder === "recent") {
          slicedResponse.sort(
            (a: LaunchData, b: LaunchData) =>
              new Date(b.launchDate).getTime() -
              new Date(a.launchDate).getTime(),
          );
        }
        setTotalPages(response.totalPages);
        setData(slicedResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sortOrder, currentPage, totalPages]);

  return (
    <UserContext.Provider
      value={{
        data,
        isLoading,
        setSortOrder,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import React, { useEffect, useState } from "react";
import bg from "../assets/pattern-dark.png";
import { getAllLaunches } from "../api/LaunchService";
import { useNavigate } from "react-router-dom";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// TypeScript interface for launch data
interface LaunchData {
  missionName: string;
  launchDate: string;
  launchStatus: string;
  launchId: string;
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<LaunchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLaunches();

        if (!response) {
          return;
        }

        // Limit the data to the first 30 launches
        const slicedResponse = response.slice(0, 30).map((launch: any) => ({
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

        setData(slicedResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sortOrder === "recent") {
      const sortedData = [...data].sort((a, b) => {
        return (
          new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
        );
      });
      setData(sortedData);
    }

    fetchData();
  }, [sortOrder, data]);

  const navigate = useNavigate();

  const handleLaunchClick = (launchId: string) => {
    navigate(`/launch/${launchId}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black text-center text-lg md:text-xl font-bold mt-96">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-center min-h-screen p-16 flex flex-col sm:items-center md:items-stretch "
    >
      <div className="border-gray-200 mt-8 flex gap-4 justify-end  text-white">
        <div className="flex gap-2 border rounded-md border-gray-200 px-4 py-2">
          <FontAwesomeIcon icon={faFilter} className=" mt-1 text-white" />
          <p className="font-semibold">Filter</p>
        </div>
        <div className="flex items-center border rounded-md bg-transparent px-4 py-2">
          <p className="mr-2 font-semibold md:text-base sm:text-sm">Sort By</p>
          <select
            className=" text-black sm:w-5 md:w-28"
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

    
      <div className="overflow-x-auto overflow-y-auto  mt-8 ">
        <table className="w-full text-white   ">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-center md:text-base sm:text-sm">
                Mission Name
              </th>
              <th className="px-4 py-2 text-center md:text-base sm:text-sm">
                Launch Date
              </th>
              <th className="px-4 py-2 text-center md:text-base sm:text-sm">
                Launch Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((launch, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="text-center px-2 py-2">
                  {" "}
                  <button
                    onClick={() => handleLaunchClick(launch.launchId)}
                    className="bg-blue-500 rounded p-2 w-32 h-10
                   hover:bg-blue-700 text-white font-bold py-2 px-4 text-center truncate"
                  >
                    {launch.missionName}{" "}
                  </button>{" "}
                </td>
                <td className="text-center px-2 py-2">
                  {new Date(launch.launchDate).toDateString()}
                </td>
                <td className="text-center px-2 py-2">{launch.launchStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;

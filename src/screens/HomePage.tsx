import React, { useEffect, useState } from "react";
import bg from "../assets/pattern-dark.png";
import { getAllLaunches } from "../api/LaunchService";
import { useNavigate } from "react-router-dom";

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLaunches();

        if (!response){
            return
        }

        // Limit the data to the first 15 launches
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

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleLaunchClick = (launchId:string) => {
    // Perform actions with the launchId, e.g., navigate to a detail page
    console.log("Launch ID:", launchId); // For testing
    navigate(`/launch/${launchId}`);
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
      className="bg-center min-h-screen flex flex-col items-center justify-center p-16"
    >
      <div className="text-white text-4xl p-8">SpaceX Launches</div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="w-full text-white">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">Mission Name</th>
              <th className="px-4 py-2 text-center">Launch Date</th>
              <th className="px-4 py-2 text-center">Launch Status</th>
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
                <td className="text-center px-2 py-2">{new Date(launch.launchDate).toDateString()}</td>
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

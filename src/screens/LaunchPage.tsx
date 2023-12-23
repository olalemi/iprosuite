import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getALaunch } from "../api/LaunchService";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LaunchData } from "../interfaces/LaunchPage/ILaunchPage";

const LaunchDetailPage = () => {
  const [launchData, setLaunchData] = useState<LaunchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchALaunch() {
      if (id) {
        try {
          const response = await getALaunch(id);

          const mappedData: LaunchData = {
            missionName: response.name,
            launchDate: response.date_utc,
            status: response.success ,
            wiki: response.links.wikipedia ?? "N/A",
            patch: response.links.patch.small?? "N/A",
            webcast: response.links.webcast ?? "N/A",
            artice: response.links.article ?? "N/A",
            rocketId: response.rocket,
            failureReason:
              response.failures.length > 0
                ? response.failures[0].reason
                : "N/A",
            launchDetails: response.details ?? "No details available",
          };

          setLaunchData(mappedData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching launch details:", error);
        }
      }
    }

    fetchALaunch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-center text-lg sm:text-md md:text-xl font-bold mt-96">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-16 ">
      <div className="text-white text-center text-3xl sm:text-base md:text-4xl p-8">
        {launchData?.missionName} Launch Data
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className=" text-white overflow-x-auto overflow-y-auto ">
          <thead className="bg-gray-700">
            <tr>
              <th> </th>
              <th className="px-4 py-2 text-center"> info</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border border-gray-200">
              <th className="border border-gray-200 sm:text-sm ">
                Launch Date{" "}
              </th>
              {launchData && (
                <td className="text-center px-2 py-2">
                  {new Date(launchData.launchDate).toDateString()}
                </td>
              )}
            </tr>
            <tr className="border border-gray-200 p-2">
              <th className="border border-gray-200 sm:text-sm ">
                Launch status
              </th>

              <td className="text-center px-2 py-2 sm:text-sm ">
                {launchData?.status ? (
                  <p className="text-green-500 font-bold">Success</p>
                ) : (
                  <p className="text-red-500 font-bold">Failed</p>
                )}
              </td>
            </tr>
            <tr className="border border-gray-200">
              <th className="border border-gray-200 p-2 sm:text-sm truncate">
                Wiki Page
              </th>
              <td className="text-center px-2 py-2">
                {launchData?.wiki && (
                  <a
                    href={launchData.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="h-6 w-6  text-white"
                    />
                  </a>
                )}
              </td>
            </tr>
            <tr className="border border-gray-200 p-2">
              <th className="border border-gray-200 p-2 sm:text-sm ">
                Mission patch
              </th>
              <td className="text-center px-2 py-2">
                {launchData?.patch && (
                  <a
                    href={launchData.patch}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="h-6 w-6  text-white"
                    />
                  </a>
                )}
              </td>
            </tr>
            <tr className="border border-gray-200">
              <th className="border  border-gray-200 p-2 sm:text-sm">
                Webcast
              </th>

              <td className="text-center px-2 py-2">
                {launchData?.webcast && (
                  <a
                    href={launchData.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="h-6 w-6  text-white"
                    />
                  </a>
                )}
              </td>
            </tr>
            <tr className="border border-gray-200">
              <th className="border border-gray-200 p-2 sm:text-sm">
                Article{" "}
              </th>
              <td className="text-center px-2 py-2">
                {launchData?.artice && (
                  <a
                    href={launchData.artice}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="h-6 w-6  text-white"
                    />
                  </a>
                )}
              </td>
            </tr>
            <tr className="border border-gray-200">
              <th className="border border-gray-200 p-2 sm:text-sm">
                Rocket used
              </th>
              <td className="text-left px-2 py-2">{launchData?.rocketId}</td>
            </tr>
            <tr className="border border-gray-200">
              <th className="border border-gray-200 p-2 sm:text-sm ">
                Reason for failure
              </th>
              <td className="text-left px-2 py-2">
                {launchData?.failureReason}
              </td>
            </tr>

            <tr className="border border-gray-200">
              <th className="border border-gray-200 p-2 sm:text-sm ">
                Launch details
              </th>
              <td className="text-left px-2 py-2 w-80 overflow-x-auto overflow-y-auto ">
                {launchData?.launchDetails}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaunchDetailPage;

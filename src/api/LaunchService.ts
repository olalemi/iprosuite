import axios from "axios";

const getBaseUrl = () => {
  return ` https://api.spacexdata.com${route}`;
};
const route = "/v5";
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAllLaunches(page = 1, limit = 10) {
  try {
    const response = await apiClient.post("/launches/query", {
      query: {},
      options: {
        page,
        limit,
        sort: { date_utc: 1 }, // Sorting by date as an example
        pagination: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting Launches:", error);
    throw error;
  }
}

async function getALaunch(id: string) {
  try {
    const response = await apiClient.get(`/launches/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching launch details:", error);
    throw error;
  }
}

export { getALaunch, getAllLaunches };

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

async function getAllLaunches() {
  try {
    const response = await apiClient.get("/launches");

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

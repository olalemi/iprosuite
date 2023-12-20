import axios from "axios";

const getBaseUrl = () => {
  return ` https://api.spacexdata.com/v5/launches`;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json"
  }
});

 async function createEmail(email: string) {
  try {
    const data = { email: email };
    const response = await apiClient.post("/email", data);
    return response.data;
  } catch (error) {
    console.error("Error posting email:", error);
    throw error;
  }
}

export {  createEmail}

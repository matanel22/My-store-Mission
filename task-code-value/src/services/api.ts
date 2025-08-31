import axios from "axios";

const API_URL = 'https://api.example.com';

export const fetchData = async (endpoint: string) => {
  const response = await axios.get(`${API_URL}/${endpoint}`);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};

export default API_URL;
import axios from "axios";

const api = axios.create({
  baseURL: "https://68176be726a599ae7c3a52c4.mockapi.io/eventhub",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

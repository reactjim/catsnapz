import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

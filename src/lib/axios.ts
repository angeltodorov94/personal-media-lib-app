import axios from "axios";
import { baseURL, READ_ACCESS_TOKEN } from "./constants";

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
  },
});

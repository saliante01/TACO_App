import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: Platform.select({
    android: "http://10.0.2.2:8000/api",
    ios: "http://localhost:8000/api",
    default: "http://localhost:8000/api",
  }),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

import axios from "axios";

// Use the environment variable if available, fallback to localhost
const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || "http://localhost:2151") + '/api',
});

export default api;

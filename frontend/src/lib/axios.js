import axios from "axios";

const base = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default axios.create({
    baseURL: base,
    timeout: 30000
});

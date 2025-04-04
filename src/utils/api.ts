import axios from "axios";
import config from "../appConfig/config";

export const API = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});
import axios from "axios";
import config from "../appConfig/config";
import { showToast } from "./helpers";

export const API = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export const setAuthToken = (token: string) => {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
};

API.interceptors.response.use(
    async function (response: any) {
        console.log(response);

        if (response?.status === 200) {
            return response.data;
        }
    },
    async function (error: any) {
        console.log("API ERROR: ", error);
        if (error?.response?.data?.msg) {
            showToast(error.response.data.msg, "error");
            // alert(error?.msg)
        }
        if (error?.status === 401) {
            setTimeout(() => {
                setAuthToken("");
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                window.location.href = "/login";
            }, 1500);
        }
        // if (encryptedError?.response?.data?.data) {
        //     let error: any = await decryptAPIResponse(encryptedError?.response?.data?.data)
        //     console.log("API ERROR: ", error);
        //     return Promise.reject(error);
        // }
        // else {
        //     // showToast("Something went wrong!", "error");
        //     return Promise.reject();
        // }
    }
);
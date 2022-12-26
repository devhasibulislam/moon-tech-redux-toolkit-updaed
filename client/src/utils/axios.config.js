import axios from "axios";

const instance = axios.create({
  baseURL: "https://mtrt-ssr.vercel.app/",
});

export default instance;

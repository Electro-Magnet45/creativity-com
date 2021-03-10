import axios from "axios";

const instance = axios.create({
  baseURL: "https://creativity-com-server.vercel.app/",
});

export default instance;

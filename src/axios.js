import axios from "axios";

const instance = axios.create({
  baseURL: "https://creativity-com.herokuapp.com/",
});

export default instance;

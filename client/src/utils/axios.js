import axios from "axios";

const instance = axios.create({
  // baseURL: "https://travelo.fun/",
  baseURL: "http://localhost:8080",
 
});

export default instance;
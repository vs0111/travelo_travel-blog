import axios from "axios";

const instance = axios.create({
  baseURL: "https://travelo.fun/",
 
});

export default instance;
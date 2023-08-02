import axios from "axios";

const client = axios.create({
  baseURL: "https://bhagavadgitaapi.in",
});

export default client;

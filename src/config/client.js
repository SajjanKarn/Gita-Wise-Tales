import axios from "axios";

export const baseURL = "https://bhagavadgitaapi.in";

const client = axios.create({
  baseURL,
});

export default client;

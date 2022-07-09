import React, { createContext } from "react";
import { fetchJSON_client, putJSON } from "../helpers/http.jsx";

export const UserContext = createContext({
  async getUser() {
    return await fetchJSON_client("/api/login");
  },
  async updateUser(user) {
    return await putJSON("/api/login/updateuser", user);
  },
});

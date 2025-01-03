//axios imports
// const axios = require("axios");

import axios from "axios";

//constants imports
const { BASE_URL } = require("../constants/index");

//main function
async function Put(path, token, putData, paramObj) {
  let url = BASE_URL + path;

  const config = {
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        },
  };

  if (paramObj) {
    let queryString = "";
    Object.keys(paramObj).forEach((val) => {
      if (paramObj[val].length > 0) {
        if (queryString.length > 0) {
          queryString += `&${val}=${paramObj[val]}`;
        } else {
          queryString += `?${val}=${paramObj[val]}`;
        }
      }
    });

    url += queryString;
    config.params = paramObj;
  }

  const { data } = await axios.put(url, putData, config);
  return data;
}

export { Put };

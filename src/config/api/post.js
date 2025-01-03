import axios from "axios";
import { BASE_URL } from "../constants";
import {CONTENT_TYPE} from "../constants"

async function Post(path, postData, token, paramObj,contentType = CONTENT_TYPE.JSON,method = "post") {
  try {
    let url = BASE_URL + path;
    const header = {
      headers: token
        ? {
            "Content-Type": contentType,
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": contentType,
          },
    };

    if (paramObj) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { paramObj },
      };
      const response = await axios[method](url, postData, config);
      return response;
    }
    const response = await axios[method](url, postData, header).catch((e) => {

     return(e)
    }
    
      );
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/signin?error_code=session_expired";
        console.log("SESSION EXPIRED");
      }
    }
  }
}

export { Post };

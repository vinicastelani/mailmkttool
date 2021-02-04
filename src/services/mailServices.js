import Axios from "axios";
import Store from "../store/index";

export default {
  async postMail(payload) {
    const response = await Axios.post(
      Store.state.api + process.env.VUE_APP_SERVICE_MAIL,
      {
        html: payload,
      }
    );
    return response.data;
  },
  async getEmails() {
    const response = await Axios.get(
      Store.state.api + process.env.VUE_APP_SERVICE_MAIL
    );
    return response.data;
  },
};

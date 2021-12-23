import { apiBase } from "../../constants/baseUrls";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["x-access-token"] = token;

  return config;
});

export const sendEmail = (data) => {
  axios({
    url: `${apiBase}/mail/send`,
    method: "POST",
    data,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(`Error al enviar e-mail:`, err);
    });
};

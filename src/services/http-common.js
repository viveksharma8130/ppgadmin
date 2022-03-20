import axios from "axios";
export const BASEURL = {
  ENDPOINT_URL: "https://api.pujyapanditg.com/",
  // ENDPOINT_URL: "http://192.168.1.39:5200/",
};
const AuthToken = sessionStorage.getItem("Authtoken");
// console.log(AuthToken);
export default axios.create({
  baseURL: `${BASEURL.ENDPOINT_URL}api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: `Bearer ${AuthToken}`,
  },
});
// console.log(localStorage.getItem("token"));

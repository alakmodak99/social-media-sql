import axios from "axios";
const BASEURL = "http://localhost:8081/";
function getToken() {
  let data =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData") || "");
  return data;
}
export const getAPI=(data)=>{
   return axios.get(`${BASEURL + data?.url}`, {
     headers: {
       Authorization: `Bearer ${getToken()}`,
     },
   });
}
export const postAPI=data=>{
   return axios.post(
     `${BASEURL + data.url}`,
     {
       ...data?.data,
     },
     {
       headers: {
         Authorization: `Bearer ${getToken()}`,
       },
     }
   );
}

export const UserDetailsLocal = () => {
  if (typeof window != "undefined" && localStorage?.getItem("UserDetails")) {
    return JSON?.parse(localStorage?.getItem("UserDetails") || "");
  }
  return {};
};
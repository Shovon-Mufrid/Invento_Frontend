import axios from "axios";

let baseUrl;

if (window.location.origin === "http://localhost:3000") {
  baseUrl = "http://127.0.0.1:8000/";
  // baseUrl = "https://testapi3.theicthub.com/";
// =======
//   baseUrl = "http://127.0.0.1:8000";
  // baseUrl = "http://190.92.218.80";
// >>>>>>> mufrid
} else {
  //production
  // baseUrl = process.env.REACT_APP_API_URL;
  baseUrl = "https://web-production-a8ef.up.railway.app/";
}
export default axios.create({
  baseURL: baseUrl,
});

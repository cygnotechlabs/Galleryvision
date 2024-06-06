// axiosConfig.ts

// import axios from "axios";
// import { useAuth } from "./Context/AuthContext";

// const useAxiosConfig = () => {
//   const { getToken } = useAuth();

//   axios.interceptors.request.use(
//     (config) => {
//       const token = getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };

// export default useAxiosConfig;

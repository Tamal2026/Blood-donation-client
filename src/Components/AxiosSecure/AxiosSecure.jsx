/* eslint-disable react-refresh/only-export-components */
import axios from "axios";


export const useAxiosSecure = axios.create({
  baseURL: 'https://blood-donation-server-green.vercel.app'
});

const AxiosSecure = () => {
  // const navigate = useNavigate();
  // const { logOut } = useContext(AuthContext);

  useAxiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');
    //   console.log('req by token', token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  useAxiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
    //   console.log('Unauth', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // await logOut();
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return useAxiosSecure;
};

export default AxiosSecure;

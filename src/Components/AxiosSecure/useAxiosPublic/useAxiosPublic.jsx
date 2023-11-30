import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://blood-donation-server-green.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
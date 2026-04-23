import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use(
    (config) => {
        // 백엔드에 저장시 store를 쓰기 때문에 useSelector를 쓰지 않는다.
        const token = store.getState().LoggedReducer.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default api;

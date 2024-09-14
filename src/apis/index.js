import axios from 'axios';
import { getCookie, setCookie } from '../common/Cookie';
/**
 * axios 인스턴스
 * @author 정은지
 * @since 2024.09.11
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.11  정은지        최초 생성
 * 2024.09.14  정은지        인터셉터 설정
 * </pre>
 */
export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

/**
 * 
 */
instance.interceptors.request.use(
    (config) => {
        const token = getCookie('accessToken');
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 액세스 토큰 재발급
 */
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 토큰이 만료된 경우 
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 리프레시 토큰을 이용하여 액세스 토큰 재발급
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/members/reissue`,
                    {},
                    {
                        headers: {
                            'x-refresh-token': `Bearer ${refreshToken}`,
                        },
                        withCredentials: true,
                    }
                );

                const accessToken = response.headers['authorization'].split(' ')[1];
                setCookie('accessToken', accessToken);

                // 액세스 토큰 추가 후 재시도
                originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
                return instance(originalRequest);  // 요청 재시도
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

import axios from 'axios';

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
 * </pre>
 */
export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});
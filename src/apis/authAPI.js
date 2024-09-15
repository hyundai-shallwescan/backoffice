import { instance } from ".";

/**
 * 로그인 및 로그아웃 API
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
export const login = async (loginId, password) => {
    const response = await instance.post('/members/login', {
        loginId,
        password,
    });
    const accessToken = response.headers['authorization'];
    const refreshToken = response.headers['x-refresh-token'];
    return { accessToken, refreshToken };
};

export const logout = async () => {
    const response = await instance.post('/members/logout');
    return response.data;
};
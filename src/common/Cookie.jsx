import {Cookies} from 'react-cookie'

/**
 * 쿠키 설정
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
const cookies = new Cookies();

export const setCookie = (name, value, options)=>{
	return cookies.set(name, value, {...options})
}

export const getCookie = (name)=>{
	return cookies.get(name)
}

export const removeCookie = (name)=>{
	return cookies.remove(name, { path: '/'})
}
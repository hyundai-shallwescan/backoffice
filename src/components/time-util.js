import moment from 'moment-timezone';


/**
 * TimeUtil
 * @author 구지웅
 * @since 2024.08.31
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.03  구지웅        최초 생성
 * </pre>
 */
const TIMEZONE = 'Asia/Seoul';


export const formatDateToKST = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).tz(TIMEZONE).format(format);
};


export const getCurrentKST = () => {
    return moment().tz(TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
};


export const parseKSTDate = (dateString) => {
    return moment.tz(dateString, TIMEZONE).toDate();
};

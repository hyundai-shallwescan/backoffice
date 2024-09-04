import moment from 'moment-timezone';

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

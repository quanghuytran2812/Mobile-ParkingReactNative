import moment from 'moment';
const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const COUNTRY_FLAG = {
    BASE_URL: `https://flagsapi.com`,
    SIZE: { 16: '16', 24: '24', 32: '32', 48: '48', 64: '64' },
    STYLE: { FLAT: 'flat', SHINY: 'shiny' },
};

const BACKEND_API = {
    BASE_API_URL: `${BACKEND_BASE_URL}`
};

const statusBookingData = [
    { code: 'OnGoing', value: 'ĐANG ĐẶT CHỖ' },
    { code: 'Completed', value: 'HOÀN THÀNH' },
    { code: 'Canceled', value: 'ĐÃ HỦY' }
]

function CurrencyFormat(num) {
    const formattedNum = num
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return `${formattedNum}₫`;
}

function splitAndFormatDate(dateString) {
    const splitDate = dateString.split('T')[0]; // Splitting the date string at 'T' to get the date part
    const formattedDate = moment(splitDate).format('DD/MM/YYYY'); // Formatting the date using Moment library

    return formattedDate;
}

function splitAndFormatTime(timeString) {
    const splitTime = timeString.split('T')[1]; // Splitting the date string at 'T' to get the time part
    const formattedTime = moment(splitTime, 'HH:mm:ss').format('HH:mm A'); // Formatting the time using Moment library

    return formattedTime;
}

function calculateDuration(startTime, endTime) {
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));
    const durationInHours = duration.asHours();

    const roundedDurationInHours = durationInHours.toFixed(2);

    return parseFloat(roundedDurationInHours);
}

export default {
    COUNTRY_FLAG, BACKEND_API, statusBookingData, splitAndFormatDate, splitAndFormatTime,
    calculateDuration, CurrencyFormat
};
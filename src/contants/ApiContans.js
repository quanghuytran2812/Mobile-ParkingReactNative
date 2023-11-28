import { Text } from 'react-native';
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

function CurrencyFormat({ num }) {
    const formattedNum = num
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return <Text>{`${formattedNum}₫`}</Text>;
}

export default { COUNTRY_FLAG, BACKEND_API, statusBookingData, CurrencyFormat };
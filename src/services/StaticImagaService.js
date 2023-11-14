import { ApiContans } from "../contants";

const getFlagIcon = (
    code = 'IN',
    style = ApiContans.COUNTRY_FLAG.STYLE.FLAT,
    size = ApiContans.COUNTRY_FLAG.SIZE[64],
) => `${ApiContans.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

export default { getFlagIcon };
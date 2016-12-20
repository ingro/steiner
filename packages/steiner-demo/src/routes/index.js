import alberghi from '../modules/alberghi/routes/alberghi';
import hotels from '../modules/hotels/routes/hotels';
import offers from '../modules/offers/routes/offers';

export default [
    ...alberghi,
    ...hotels,
    ...offers
];
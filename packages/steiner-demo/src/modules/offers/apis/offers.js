import helper from 'helpers/steinerHelper';

export default helper.createApi('offers', null, {
    // To avoid filtering on API
    q: 'foo'
});
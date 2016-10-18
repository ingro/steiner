import createApi from '../../src/helpers/apiCreator';

function dummyClient(props) {
    return props;
}

// TODO: write tests about custom paramsMap and buildParams function
describe('apiCreator', () => {
    it('creates the correct api calls', () => {
        const apis = createApi('posts', dummyClient);

        expect(apis.fetch(42)).toMatchSnapshot();
        expect(apis.list()).toMatchSnapshot();
        expect(apis.create({ foo: 'bar' })).toMatchSnapshot();
        expect(apis.update(42, { foo: 'bar' })).toMatchSnapshot();
        expect(apis.delete(42)).toMatchSnapshot();
    });
});

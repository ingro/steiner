import renderer from 'react-test-renderer';
import React from 'react';

import HeaderLink from '../src/components/HeaderLink';

test('HeaderLink renders correctly', () => {
    const tree = renderer.create(
        <HeaderLink to="/foo" name="Foo" location={{ pathname: '/foo/bar' }} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
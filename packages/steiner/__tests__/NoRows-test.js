import renderer from 'react-test-renderer';
import React from 'react';

import NoRows from '../src/components/NoRows';

test('NoRows renders correctly', () => {
    const tree = renderer.create(
        <NoRows />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
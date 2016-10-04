import renderer from 'react-test-renderer';
import React from 'react';

import NoRows from '../src/components/NoRows';

test('NoRows renders correctly', () => {
    const tree = renderer.create(
        <NoRows />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('NoRows renders correctly a custom message', () => {
    const tree = renderer.create(
        <NoRows noRowsMsg="No items to show! Check back later!" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('NoRows renders an error message', () => {
    const tree = renderer.create(
        <NoRows errorMsg="Too bad!" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('NoRows renders a loading message', () => {
    const tree = renderer.create(
        <NoRows isFetching={true} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('NoRows doesn\'t render it there are rows', () => {
    const tree = renderer.create(
        <NoRows isFetching={true} itemsNumber={10} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
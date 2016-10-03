import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';

import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import HotelsListFilter from '../components/HotelsListFilter';
import HotelsListTable from '../components/HotelsListTable';

class HotelsListLayout extends Component {
    render() {
        return (
            <ListLayout
                {...this.props}
                filterComponent={HotelsListFilter}
                tableComponent={HotelsListTable}
            />
        )
    }
}

export default connectCreator.connectList(HotelsListLayout, actions, selectors);
import React, { Component } from 'react';

import { connectList } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import ListLayout from 'steiner/dist/components/ListLayout';
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

export default connectList(HotelsListLayout, actions, selectors);
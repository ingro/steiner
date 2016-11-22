import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';
import Helmet from 'react-helmet';

import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import HotelsListFilter from '../components/HotelsListFilter';
import HotelsListTable from '../components/HotelsListTable';

class HotelsListLayout extends Component {
    render() {
        return (
            <div>
                <Helmet title="Hotels" />
                <ListLayout
                    {...this.props}
                    filterComponent={HotelsListFilter}
                    tableComponent={HotelsListTable}
                />
            </div>
        );
    }
}

export default connectCreator.connectList(HotelsListLayout, actions, selectors);
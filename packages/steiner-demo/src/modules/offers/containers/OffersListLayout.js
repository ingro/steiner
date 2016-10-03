import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';

import { actions } from '../actions/offers';
import { selectors } from '../reducers/offers';
import OffersListFilter from '../components/OffersListFilter';
import OffersListTable from '../components/OffersListTable';

class OffersListLayout extends Component {
    render() {
        return (
            <ListLayout
                {...this.props}
                filterComponent={OffersListFilter}
                tableComponent={OffersListTable}
            />
        )
    }
}

export default connectCreator.connectList(OffersListLayout, actions, selectors);
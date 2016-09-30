import React, { Component } from 'react';

import { connectList } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/offers';
import { selectors } from '../reducers/offers';
import { ListLayout } from 'steiner';
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

export default connectList(OffersListLayout, actions, selectors);
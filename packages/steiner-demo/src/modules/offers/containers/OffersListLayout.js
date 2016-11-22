import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';

import { actions } from '../actions/offers';
import { selectors } from '../reducers/offers';
import OffersListFilter from '../components/OffersListFilter';
import OffersListTable from '../components/OffersListTable';

class OffersListLayout extends Component {
    render() {
        return (
            <div>
                <ListLayout
                    {...this.props}
                    clientFilters={true}
                    filterComponent={ OffersListFilter }
                    tableComponent={ OffersListTable }
                />
            </div>
        )
    }
}

export default connectCreator.connectList(OffersListLayout, actions, selectors);
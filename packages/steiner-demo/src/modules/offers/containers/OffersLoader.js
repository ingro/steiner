import React, { Component } from 'react';
import { connectCreator, ItemLoader } from 'steiner';

import { actions } from '../actions/offers';
import { selectors } from '../reducers/offers';
import OffersEdit from '../components/OffersEdit';

class OffersLoader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={OffersEdit}
            />
        );
    }
}

export default connectCreator.connectItem(OffersLoader, actions, selectors);

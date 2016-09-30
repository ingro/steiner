import React, { Component } from 'react';

import { connectItem } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/offers';
import { selectors } from '../reducers/offers';
import { ItemLoader } from 'steiner';
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

export default connectItem(OffersLoader, actions, selectors);

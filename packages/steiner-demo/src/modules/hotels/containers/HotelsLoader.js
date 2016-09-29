import React, { Component } from 'react';

import { connectItem } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
import ItemLoader from 'steiner/dist/components/ItemLoader';
import HotelsEdit from '../components/HotelsEdit';

class HotelsLoader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={HotelsEdit}
            />
        );
    }
}

export default connectItem(HotelsLoader, actions, selectors);

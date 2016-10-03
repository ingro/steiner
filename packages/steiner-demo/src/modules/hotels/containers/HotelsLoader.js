import React, { Component } from 'react';
import { connectCreator, ItemLoader } from 'steiner';

import { actions } from '../actions/hotels';
import { selectors } from '../reducers/hotels';
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

export default connectCreator.connectItem(HotelsLoader, actions, selectors);

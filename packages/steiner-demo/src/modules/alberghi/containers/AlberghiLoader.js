import React, { Component } from 'react';
import { connectCreator, ItemLoader } from 'steiner';

import { actions } from '../actions/alberghi';
import { selectors } from '../reducers/alberghi';
import AlberghiEdit from '../components/AlberghiEdit';

class AlberghiLoader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={ AlberghiEdit }
            />
        );
    }
}

export default connectCreator.connectItem(AlberghiLoader, actions, selectors);

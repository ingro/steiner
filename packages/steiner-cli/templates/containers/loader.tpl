import React, { Component } from 'react';

import { connectItem } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import ItemLoader from 'steiner/dist/components/ItemLoader';
import ${ucName}Edit from '../components/${ucName}Edit';

class ${ucName}Loader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={${ucName}Edit}
            />
        );
    }
}

export default connectItem(${ucName}Loader, actions, selectors);

import React, { Component } from 'react';
import { connectCreator, ItemLoader } from 'steiner';

import { actions } from '../actions/{{name}}';
import { selectors } from '../reducers/{{name}}';
import {{ucName}}Edit from '../components/{{ucName}}Edit';

class {{ucName}}Loader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={ {{ucName}}Edit }
            />
        );
    }
}

export default connectCreator.connectItem({{ucName}}Loader, actions, selectors);

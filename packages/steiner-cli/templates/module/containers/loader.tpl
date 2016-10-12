import React, { Component } from 'react';
import { connectCreator, ItemLoader } from 'steiner';

import { actions } from '../actions/{{name}}';
import { selectors } from '../reducers/{{name}}';
import {{name | title}}Edit from '../components/{{name | title}}Edit';

class {{name | title}}Loader extends Component {
    render() {
        return (
            <ItemLoader
                {...this.props}
                component={ {{name | title}}Edit }
            />
        );
    }
}

export default connectCreator.connectItem({{name | title}}Loader, actions, selectors);

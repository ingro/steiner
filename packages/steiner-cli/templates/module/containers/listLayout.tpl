import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';

import { actions } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import ${ucName}ListFilter from '../components/${ucName}ListFilter';
import ${ucName}ListTable from '../components/${ucName}ListTable';

class ${ucName}ListLayout extends Component {
    render() {
        return (
            <ListLayout
                {...this.props}
                filterComponent={${ucName}ListFilter}
                tableComponent={${ucName}ListTable}
            />
        )
    }
}

export default connectCreator.connectList(${ucName}ListLayout, actions, selectors);
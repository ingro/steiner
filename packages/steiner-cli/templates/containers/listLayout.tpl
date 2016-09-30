import React, { Component } from 'react';

import { connectList } from 'steiner/dist/helpers/connectCreator';
import { actions } from '../actions/${name}';
import { selectors } from '../reducers/${name}';
import { ListLayout } from 'steiner';
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

export default connectList(${ucName}ListLayout, actions, selectors);
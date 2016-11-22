import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

import { actions } from '../actions/{{name}}';
import { selectors } from '../reducers/{{name}}';
import {{name | title}}ListFilter from '../components/{{name | title}}ListFilter';
import {{name | title}}ListTable from '../components/{{name | title}}ListTable';

class {{name | title}}ListLayout extends Component {
    render() {
        return (
            <div>
                {% if richComponents %}<Helmet title="{{name | title}}" />{% endif %}
                <ListLayout
                    {...this.props}
                    filterComponent={ {{name | title}}ListFilter }
                    tableComponent={ {{name | title}}ListTable }
                />
            </div>
        );
    }
}

export default connectCreator.connectList({{name | title}}ListLayout, actions, selectors);
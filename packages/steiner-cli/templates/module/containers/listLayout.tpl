import React, { Component } from 'react';
import { connectCreator, ListLayout } from 'steiner';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

import { actions } from '../actions/{{name}}';
import { selectors } from '../reducers/{{name}}';
import {{ucName}}ListFilter from '../components/{{ucName}}ListFilter';
import {{ucName}}ListTable from '../components/{{ucName}}ListTable';

class {{ucName}}ListLayout extends Component {
    render() {
        return (
            <div>
                {% if richComponents %}
                <Helmet>
                    <title>{{name | title}}</title>
                </Helmet>
                {% endif %}
                <ListLayout
                    {...this.props}
                    filterComponent={ {{ucName}}ListFilter }
                    tableComponent={ {{ucName}}ListTable }
                />
            </div>
        );
    }
}

export default connectCreator.connectList({{ucName}}ListLayout, actions, selectors);
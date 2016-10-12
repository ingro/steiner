import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';

import { linkTo } from '../routes/{{name}}';
{% if richComponents %}import KeyBinderHoc from 'components/KeyBinder';{% endif %}

{%- set componentName = name | title + 'ListFilter' %}

export default class {{componentName}} extends Component {
    {% if richComponents -%}
    componentWillMount() {
        this.props.bindShortcut(['ctrl+d', 'command+d'], (e) => { 
            e.preventDefault(); 
            this.context.router.transitionTo(linkTo('create'));
        }, true);
    }
    {%- endif %}

    componentDidMount() {
        this.filter.input.focus();
    }

    render() {
        const { filters } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        ref={filter => this.filter = filter}
                        value={filters.q}
                        onChange={this.props.updateFilter}
                    />
                </div>
                <div className="col-xs-8 text-right">
                    <Link className="btn btn-success" to={linkTo('create')}>Create</Link>
                </div>
            </div>
        );
    }
}

{{componentName}}.propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func
};

{{componentName}}.contextTypes = {
    router: PropTypes.object
};

{% if richComponents %}export default KeyBinderHoc({{componentName}});{% endif %}
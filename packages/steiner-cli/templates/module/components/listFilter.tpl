import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';

import routeRegister from 'helpers/routeRegister';
{% if richComponents %}import KeyBinderHoc from 'components/KeyBinder';{% endif %}

{%- set componentName = name | title + 'ListFilter' %}

export default class {{componentName}} extends Component {
    {% if richComponents -%}
    componentWillMount() {
        this.props.bindShortcut(['ctrl+d', 'command+d'], (e) => {
            e.preventDefault();
            this.context.router.transitionTo(routeRegister.getLinkTo('{{name}}.create'));
        }, true);
    }
    {%- endif %}

    render() {
        const { filters } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={this.props.updateFilter}
                        placeholder={this.context.steiner.messages.inputListFilterPlaceholder}
                    />
                </div>
                <div className="col-xs-8 text-right">
                    <Link className="btn btn-success" to={routeRegister.getLinkTo('{{name}}.create')}>{this.context.steiner.messages.create}</Link>
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

{{componentName}}.contextTypes = {
    steiner: PropTypes.object
};

{% if richComponents %}export default KeyBinderHoc({{componentName}});{% endif %}
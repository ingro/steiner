import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputListFilter from 'steiner/lib/components/InputListFilter';
{% if richComponents %}import KeyBinderHoc from 'steiner/lib/components/KeyBinderHoc';{% endif %}
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import routeRegister from 'helpers/routeRegister';

{%- set componentName = ucName + 'ListFilter' %}

export class {{componentName}} extends Component {
    {% if richComponents -%}
    componentDidMount() {
        this.props.bindShortcut(['ctrl+d', 'command+d'], (e) => {
            e.preventDefault();
            this.context.router.transitionTo(routeRegister.getLinkTo('{{name}}.create'));
        }, true);
    }
    {%- endif %}

    render() {
        const { createLabel, filters, inputListFilterPlaceholder } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={this.props.updateFilter}
                        placeholder={inputListFilterPlaceholder}
                    />
                </div>
                <div className="col-xs-8 text-right">
                    <Link className="btn btn-success" to={routeRegister.getLinkTo('{{name}}.create')}>{createLabel}</Link>
                </div>
            </div>
        );
    }
}

{{componentName}}.propTypes = {
    createLabel: PropTypes.string,
    filters: PropTypes.object,
    inputListFilterPlaceholder: PropTypes.string,
    updateFilter: PropTypes.func
};

{{componentName}}.defaultProps = {
    createLabel: 'Create',
    inputListFilterPlaceholder: 'Type to search...'
};

{{componentName}}.contextTypes = {
    router: PropTypes.object
};

{% if richComponents -%}
    const {{componentName}}Keyed = KeyBinderHoc({{componentName}});
    {%- set componentName = componentName + 'Keyed' -%}
{%- endif %}

export default TranslatorHoc({{componentName}}, {
    createLabel: 'steiner.labels.create',
    inputListFilterPlaceholder: 'steiner.labels.searchPlaceholder'
});
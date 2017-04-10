import React, { Component } from 'react';
import PropTypes from 'prop-types';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

{%- set formComponentName = ucName + 'Form' %}

import {{formComponentName}} from './{{formComponentName}}';
import routeRegister from 'helpers/routeRegister';

{%- set componentName = ucName + 'Edit' %}

export default class {{componentName}} extends Component {
    createInitialFormValues(item) {
        return item;
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new {{name | title}}';
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('{{name}}.list');
    }

    render() {
        const title = this.getTitle();

        return (
            <div className="row">
                <div className="col-xs-12">
                    {% if richComponents %}
                    <Helmet>
                        <title>{`{{name | title}} > ${this.getTitle()}`}</title>
                    </Helmet>
                    {% endif %}
                    <h3 className="text-center">{title}</h3>
                    <{{formComponentName}}
                        cancelLink={this.getCancelLink()}
                        initialValues={this.createInitialFormValues(this.props.item)}
                    />
                </div>
            </div>
        );
    }
}

{{componentName}}.propTypes = {
    item: PropTypes.object,
    previousUrl: PropTypes.any
};
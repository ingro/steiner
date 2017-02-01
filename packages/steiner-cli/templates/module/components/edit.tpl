import React, { Component } from 'react';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

{%- set formComponentName = name | title + 'Form' %}

import {{formComponentName}} from './{{formComponentName}}';
import routeRegister from 'helpers/routeRegister';

{%- set componentName = name | title + 'Edit' %}

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
                    {% if richComponents %}<Helmet title={`{{name | title}} > ${this.getTitle()}`} />{% endif %}
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
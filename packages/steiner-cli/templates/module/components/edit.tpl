import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavigationPrompt } from 'react-router';
import { formHelper, FormWrapper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

import { actionTypes } from '../actions/{{name}}';
import routeRegister from 'helpers/routeRegister';

{%- set componentName = name | title + 'Edit' %}

class {{componentName}} extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    createInitialFormValues(item) {
        return item;
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new {{name | title}}';
    }

    render() {
        const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset } = this.props;

        return(
            <div>
                {% if richComponents %}<Helmet title={`{{name | title}} > ${this.getTitle()}`} />{% endif %}
                <FormWrapper
                    {...this.props}
                    title={this.getTitle()}
                    cancelLink={routeRegister.getLinkTo('{{name}}.list')}
                    submit={this.submit}
                    createInitialFormValues={this.createInitialFormValues}
                >
                    <Field
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        component={InputField}
                    />
                    {/* Fields */}
                </FormWrapper>
            </div>
        );
    }
}

export default reduxForm({
    form: '{{name}}'
})({{componentName}});
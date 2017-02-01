import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { formHelper, FormWrapper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';

import { actionTypes } from '../actions/hotels';

{%- set componentName = name | title + 'Edit' %}

class {{componentName}} extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    render() {
        return (
            <FormWrapper
                {...this.props}
                cancelLink={this.props.cancelLink}
                submit={this.submit}
            >
                <Field
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    label="Name"
                    component={InputField}
                />
            </FormWrapper>
        );
    }
}

{{componentName}}.propTypes = {
    cancelLink: PropTypes.string,
    initialValues: PropTypes.object
};

export default reduxForm({
    form: '{{name}}',
})({{componentName}});
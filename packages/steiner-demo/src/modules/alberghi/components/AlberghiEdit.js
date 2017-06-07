import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { formHelper, FormWrapper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';

import { actionTypes } from '../actions/alberghi';
import routeRegister from 'helpers/routeRegister';

class AlberghiEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    createInitialFormValues(item) {
        return item;
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new Alberghi';
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('alberghi.list');
    }

    render() {
        return (
            <div>
                
                <FormWrapper
                    {...this.props}
                    title={this.getTitle()}
                    cancelLink={this.getCancelLink()}
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
    form: 'alberghi'
})(AlberghiEdit);
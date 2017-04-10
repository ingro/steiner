import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { formHelper, FormWrapper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';
import CheckboxField from 'vivi/lib/Form/CheckboxField';
import SelectAsyncField from 'vivi/lib/Form/SelectAsyncField';

import {
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';

import client from 'apis/client';
import { createReactSelectLoader } from 'helpers/helpers';
import { actionTypes } from '../actions/hotels';

const validate = combineValidators({
    name: composeValidators(
        isRequired('Name'),
        hasLengthGreaterThan(8)({
            message: 'The name must be at least 8 characters long'
        })
    )()
});

class HotelsForm extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes, data => ({
            ...data,
            positionId: data.positionId ? data.positionId.value : null
        }));
    }

    // createInitialFormValues(item) {
    //     return {
    //         ...item,
    //         positionId: item.position ? { value: item.positionId, label: item.position.name } : {},
    //         tags: [{value: 1, label: 'estate'}, {value: 4, label: 'famiglia'}]
    //     };
    // }

    // getTitle() {
    //     const { item } = this.props;

    //     return item.name ? item.name : 'Create new Hotels';
    // }

    // getCancelLink() {
    //     return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('hotels.list');
    // }

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
                <Field
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    label="Address"
                    component={InputField}
                />
                <Field
                    className="form-control"
                    name="positionId"
                    placeholder="Position"
                    label="Position"
                    component={SelectAsyncField}
                    loadOptions={createReactSelectLoader('positions', client, { labelKey: 'name', valueKey: 'id' })}
                />
                <Field
                    className="form-control"
                    name="tags"
                    placeholder="Tags"
                    label="Tags"
                    component={SelectAsyncField}
                    loadOptions={createReactSelectLoader('tags', client, { labelKey: 'name', valueKey: 'id' })}
                    selectOptions={{ multi: true }}
                />
                <Field
                    className="form-control"
                    name="active"
                    label="Active"
                    component={CheckboxField}
                    type="checkbox"
                />
            </FormWrapper>
        );
    }
}

HotelsForm.propTypes = {
    cancelLink: PropTypes.string,
    initialValues: PropTypes.object
};

export default reduxForm({
    form: 'hotels',
    validate
})(HotelsForm);
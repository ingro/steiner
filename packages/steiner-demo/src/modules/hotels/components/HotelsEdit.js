import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { formHelper, FormWrapper } from 'steiner';
import Helmet from 'react-helmet';
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
import routeRegister from 'helpers/routeRegister';
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

class HotelsEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes, data => ({
            ...data,
            positionId: data.positionId ? data.positionId.value : null
        }));
    }

    createInitialFormValues(item) {
        return {
            ...item,
            positionId: item.position ? { value: item.positionId, label: item.position.name } : {},
            tags: [{value: 1, label: 'estate'}, {value: 4, label: 'famiglia'}]
        };
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new Hotels';
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('hotels.list');
    }

    render() {
        return (
            <div>
                <Helmet title={`Hotels > ${this.getTitle()}`} />
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
                    <Field
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        component={InputField}
                    />
                    <Field
                        className="form-control"
                        name="positionId"
                        placeholder="Position"
                        component={SelectAsyncField}
                        loadOptions={createReactSelectLoader('positions', client, { labelKey: 'name', valueKey: 'id' })}
                    />
                    <Field
                        className="form-control"
                        name="tags"
                        placeholder="Tags"
                        component={SelectAsyncField}
                        loadOptions={createReactSelectLoader('tags', client, { labelKey: 'name', valueKey: 'id' })}
                        selectOptions={{ multi: true }}
                    />
                    <Field
                        className="form-control"
                        name="active"
                        component={CheckboxField}
                        type="checkbox"
                    />
                </FormWrapper>
            </div>
        );
    }
}

export default reduxForm({
    form: 'hotels',
    validate
})(HotelsEdit);
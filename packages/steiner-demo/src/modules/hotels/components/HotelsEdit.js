import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormControls, formHelper } from 'steiner';
import { NavigationPrompt } from 'react-router';
import InputField from 'vivi/dist/Form/InputField';
import CheckboxField from 'vivi/dist/Form/CheckboxField';
import SelectAsyncField from 'vivi/dist/Form/SelectAsyncField';

import {
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';

import client from 'apis/client';
import { createReactSelectLoader } from 'helpers/helpers';
import { actionTypes } from '../actions/hotels';
import { linkTo } from '../routes/hotels';

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
            positionId: data.positionId ? data.positionId.id : null
        }));
    }

    componentWillMount() {
        const { item } = this.props;

        const values = {
            ...item,
            positionId: item.position ? { id: item.positionId, name: item.position.name } : {},
            tags: [{id: 1, name: 'estate'}, {id: 4, name: 'famiglia'}]
        };

        this.props.initialize(values);
    }

    componentDidMount() {
        this.form.elements[0].focus()
    }

    componentWillReceiveProps(props) {
        if (props.submitSucceeded) {
            setTimeout(() => {
                this.context.router.transitionTo(linkTo('list'));
            }, 0);
        }
    }

    render() {
        const { handleSubmit, submitting, valid, item, error, dirty, submitSucceeded } = this.props;

        return(
            <div className="container">
                <NavigationPrompt when={dirty && !submitSucceeded} message="Are you sure? Any unsaved changes will be lost." />
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{item.name ? item.name : 'Create new Hotels'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form ref={form => this.form = form} onSubmit={handleSubmit(this.submit)} className="form-horizontal">
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
                            loadOptions={createReactSelectLoader('positions', client)}
                        />
                        <Field
                            className="form-control"
                            name="tags"
                            placeholder="Tags"
                            component={SelectAsyncField}
                            loadOptions={createReactSelectLoader('tags', client)}
                            selectOptions={{ multi: true }}
                        />                  
                        <Field
                            className="form-control"
                            name="active"
                            component={CheckboxField}
                            type="checkbox"
                        />
                        <div className="row">
                            <FormControls
                                valid={valid}
                                submitting={submitting}
                                cancelLink={linkTo('list')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

HotelsEdit.PropTypes = {
    handleSubmit: PropTypes.func
};

HotelsEdit.contextTypes = {
    router: PropTypes.object
};

export default reduxForm({
    form: 'hotels',
    validate
})(HotelsEdit);
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormControls } from 'steiner';
import { NavigationPrompt } from 'react-router';
import Helmet from 'react-helmet';
import { auth } from 'steiner';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';

import InputField from 'vivi/lib/Form/InputField';
import SelectField from 'vivi/lib/Form/SelectField';

function submit(data, dispatch) {
    const action = createFormAction(auth.actionTypes.updateProfile, [auth.actionTypes.updateProfileSuccess, auth.actionTypes.updateProfileFail])

    const payload = {
        ...data,
        language: data.language.id ? data.language.id : data.language
    }

    return action(payload, dispatch);
}

export class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.submit = submit;
    }

    componentWillMount() {
        const { user } = this.props;

        this.props.initialize(user);
    }

    render() {
        const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset } = this.props;

        return (
            <div className="container">
                <Helmet title="Profile" />
                <NavigationPrompt when={dirty && !submitSucceeded} message="Are you sure? Any unsaved changes will be lost." />
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h2>Profile</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.submit)} className="form-horizontal">
                        <Field
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            label="Username"
                            component={InputField}
                        />
                        <Field
                            className="form-control"
                            name="language"
                            placeholder="Language"
                            label="Language"
                            component={SelectField}
                            options={[{ id: 'it', name: 'Italian' }, { id: 'en', name: 'English' }]}
                        />
                        <Field
                            className="form-control"
                            name="rowsPerPage"
                            placeholder="Rows per page"
                            label="Rows per page"
                            component={SelectField}
                            options={[{ id: 10, name: 10 }, { id: 20, name: 20 }, { id: 50, name: 50 }]}
                        />
                        <div className="row">
                            <FormControls
                                valid={valid}
                                submitting={submitting}
                                dirty={dirty}
                                cancelLink={'/'}
                                onReset={reset}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'profile'
})(Profile);

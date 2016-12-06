import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { auth, FormWrapper } from 'steiner';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import InputField from 'vivi/lib/Form/InputField';
import SelectField from 'vivi/lib/Form/SelectField';

import { selectors } from 'steiner/lib/auth/reducer';

function submit(data, dispatch) {
    const action = createFormAction(auth.actionTypes.updateProfile, [auth.actionTypes.updateProfileSuccess, auth.actionTypes.updateProfileFail])

    const payload = {
        ...data,
        language: data.language.value ? data.language.value : data.language
    };

    return action(payload, dispatch);
}

export class Profile extends Component {
    render() {
        return (
            <div>
                <Helmet title="Profile" />
                <FormWrapper
                    {...this.props}
                    item={this.props.user}
                    title="User's Profile"
                    cancelLink="/"
                    submit={submit}
                    goBackAfterSave={false}
                >
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
                        options={[{ value: 'it', label: 'Italian' }, { value: 'en', label: 'English' }]}
                    />
                </FormWrapper>
            </div>
        );
    }
}

Profile.propTypes = {
    reloadMessage: PropTypes.string,
    unsavedMessage: PropTypes.string,
    user: PropTypes.object
};

Profile.defaultProps = {
    reloadMessage: 'The page needs to be reloaded in order to apply the changes.',
    unsavedMessage: 'Are you sure? Any unsaved changes will be lost.'
}

const TranslatedProfile = TranslatorHoc(Profile, {
    reloadMessage: 'steiner.messages.confirmReload',
    unsavedMessage: 'steiner.messages.confirmUnsaved',
});

const ConnectedTranslatedProfile = connect(state => ({ user: selectors.getUser(state) }))(TranslatedProfile);

export default reduxForm({
    form: 'profile'
})(ConnectedTranslatedProfile);

import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import Helmet from 'react-helmet';
import { auth, FormWrapper } from 'steiner';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';
import debounce from 'lodash/debounce';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import InputField from 'vivi/lib/Form/InputField';
import SelectField from 'vivi/lib/Form/SelectField';

import helper from 'helpers/steinerHelper';

function submit(data, dispatch) {
    const action = createFormAction(auth.actionTypes.updateProfile, [auth.actionTypes.updateProfileSuccess, auth.actionTypes.updateProfileFail])

    const payload = {
        ...data,
        language: data.language.id ? data.language.id : data.language
    };

    return action(payload, dispatch);
}

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.confirmRefresh = debounce(this.showConfirmRefresh, 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.submitSucceeded) {
            this.confirmRefresh();
        }
    }

    showConfirmRefresh = () => {
        this.props.dispatch(helper.createConfirmAction({
            message: this.props.reloadMessage,
            onSuccess: () => window.location.reload(false)
        }));
    }

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
                        options={[{ id: 'it', name: 'Italian' }, { id: 'en', name: 'English' }]}
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

export default reduxForm({
    form: 'profile'
})(TranslatedProfile);

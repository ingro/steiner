import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
// import { FormControls } from 'steiner';
// import { NavigationPrompt } from 'react-router';
import Helmet from 'react-helmet';
import { auth } from 'steiner';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';
import debounce from 'lodash/debounce';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import InputField from 'vivi/lib/Form/InputField';
import SelectField from 'vivi/lib/Form/SelectField';

import helper from 'helpers/steinerHelper';
import FormWrapper from 'components/FormWrapper';

function submit(data, dispatch) {
    const action = createFormAction(auth.actionTypes.updateProfile, [auth.actionTypes.updateProfileSuccess, auth.actionTypes.updateProfileFail])

    const payload = {
        ...data,
        language: data.language.id ? data.language.id : data.language,
        // rowsPerPage: data.rowsPerPage.id ? data.rowsPerPage.id : data.rowsPerPage
    };

    return action(payload, dispatch);
}

export class Profile extends Component {
    constructor(props) {
        super(props);
        
        // this.submit = submit;

        this.confirmRefresh = debounce(this.showConfirmRefresh, 500);
    }

    // componentDidMount() {
    //     const { user } = this.props;

    //     this.props.initialize(user);
    // }

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

    // render() {
    //     const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset, unsavedMessage } = this.props;

    //     return (
    //         <div className="container">
    //             <Helmet title="Profile" />
    //             <NavigationPrompt when={dirty && !submitSucceeded} message={unsavedMessage} />
    //             <div className="col-xs-6 col-xs-offset-3 text-center">
    //                 <h2>User's Profile</h2>
    //                 {error && <div className="alert alert-danger">{error}</div>}
    //                 <form onSubmit={handleSubmit(this.submit)} className="form-horizontal">
    //                     <Field
    //                         className="form-control"
    //                         name="username"
    //                         placeholder="Username"
    //                         label="Username"
    //                         component={InputField}
    //                     />
    //                     <Field
    //                         className="form-control"
    //                         name="language"
    //                         placeholder="Language"
    //                         label="Language"
    //                         component={SelectField}
    //                         options={[{ id: 'it', name: 'Italian' }, { id: 'en', name: 'English' }]}
    //                     />
    //                     <div className="row">
    //                         <FormControls
    //                             valid={valid}
    //                             submitting={submitting}
    //                             dirty={dirty}
    //                             cancelLink={'/'}
    //                             onReset={reset}
    //                         />
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     );
    // }
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

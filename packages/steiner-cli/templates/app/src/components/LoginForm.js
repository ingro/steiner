import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';
import { auth } from 'steiner';
import InputField from 'vivi/dist/Form/InputField';
import LoadingButton from 'vivi/dist/LoadingButton';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.submit = (data, dispatch) => {
            const action = createFormAction(auth.actionTypes.login, [auth.actionTypes.loginSuccess, auth.actionTypes.loginFail]);

            return action(data, dispatch);
        }
    }

    componentWillReceiveProps(props) {
        if (props.submitSucceeded) {
            setTimeout(() => {
                this.context.router.transitionTo('/');
            }, 0);
        }
    }

    render() {
        const { handleSubmit, submitting, error } = this.props;

        return (
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <div className="panel panel-info">
                        <div className="panel-heading">Login</div>
                        <div className="panel-body">
                            <form onSubmit={handleSubmit(this.submit)}>
                                <div className="form-group">
                                    <Field
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        component={InputField}
                                        onlyInput={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <Field
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        component={InputField}
                                        type="password"
                                        onlyInput={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <LoadingButton
                                        className="btn-success btn-block"
                                        loading={submitting}
                                        loadingMsg={<span><i className="fa fa-spin fa-spinner" /> Authenticating...</span>}
                                    >
                                        Login
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        )
    }
}

LoginForm.contextTypes = {
    router: PropTypes.object
};

export default reduxForm({
    form: 'login'
})(LoginForm);

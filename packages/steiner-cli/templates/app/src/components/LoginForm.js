import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createFormAction } from 'steiner/lib/helpers/reduxFormSaga';
import { auth } from 'steiner';
import Helmet from 'react-helmet';
import InputField from 'vivi/lib/Form/InputField';
import LoadingButton from 'vivi/lib/LoadingButton';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.submit = (data, dispatch) => {
            const action = createFormAction(auth.actionTypes.login, [auth.actionTypes.loginSuccess, auth.actionTypes.loginFail]);

            return action(data, dispatch);
        };
    }

    componentDidMount() {
        this.form.elements[0].focus();
    }

    render() {
        const { handleSubmit, submitting, error } = this.props;

        return (
            <div className="container">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <div className="panel panel-info">
                        <div className="panel-heading">{process.env.REACT_APP_NAME} - Login</div>
                        <div className="panel-body">
                            <form ref={form => this.form = form} onSubmit={handleSubmit(this.submit)}>
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
        );
    }
}

export default reduxForm({
    form: 'login'
})(LoginForm);

import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from 'vivi/dist/Form/InputField';
import CheckboxField from 'vivi/dist/Form/CheckboxField';
import SelectAsyncField from 'vivi/dist/Form/SelectAsyncField';
import { createReactSelectLoader } from 'steiner/dist/helpers/apiCreator';
import {
    /*createValidator,*/
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';

import client from '../../../apis/client';
import { actionTypes } from '../actions/hotels';
import { FormControls } from 'steiner';
import { createSubmit } from 'steiner/dist/helpers/formHelper';
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

        this.submit = createSubmit(actionTypes);
    }

    componentWillReceiveProps(props) {
        if (props.submitSucceeded) {
            setTimeout(() => {
                this.context.router.transitionTo(linkTo('list'));
            }, 0);
        }
    }

    render() {
        const { handleSubmit, submitting, valid, item, error } = this.props;

        return(
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{item.name ? item.name : 'Create new Hotels'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.submit)} className="form-horizontal">
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                component={InputField}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="address"
                                placeholder="Address"
                                component={InputField}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="positionId"
                                placeholder="Position"
                                component={SelectAsyncField}
                                loadOptions={createReactSelectLoader('positions', client)}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="active"
                                component={CheckboxField}
                                type="checkbox"
                            />
                        </div>
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
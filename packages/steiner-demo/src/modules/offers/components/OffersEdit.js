import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from 'vivi/dist/Form/InputField';

import { actionTypes } from '../actions/offers';
import { FormControls } from 'steiner';
import { createSubmit } from 'steiner/dist/helpers/formHelper';
import { linkTo } from '../routes/offers';

class OffersEdit extends Component {
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
        const { handleSubmit, submitting, item, error } = this.props;

        return(
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{item.name ? item.name : 'Create new Offers'}</h3>
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
                        {/* Fields... */}
                        <div className="row">
                            <FormControls
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

OffersEdit.PropTypes = {
    handleSubmit: PropTypes.func
};

OffersEdit.contextTypes = {
    router: PropTypes.object
};

export default reduxForm({
    form: 'offers'
})(OffersEdit);
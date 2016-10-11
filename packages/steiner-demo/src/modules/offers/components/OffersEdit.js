import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormControls, formHelper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';

import { actionTypes } from '../actions/offers';
import { linkTo } from '../routes/offers';

class OffersEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    componentWillMount() {
        this.props.initialize(this.props.item);
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
                        <Field
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            component={InputField}
                        />
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
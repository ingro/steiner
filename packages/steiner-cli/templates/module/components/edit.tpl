import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavigationPrompt } from 'react-router';
import { FormControls, formHelper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';

import { actionTypes } from '../actions/{{name}}';
import { linkTo } from '../routes/{{name}}';

class {{ucName}}Edit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    componentWillMount() {
        this.props.initialize(this.createInitialFormValues(this.props.item));
    }

    componentDidMount() {
        this.form.elements[0].focus();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item && nextProps.item.id !== this.props.item.id)  {
            this.props.initialize(this.createInitialFormValues(nextProps.item));
        }

        if (nextProps.submitSucceeded) {
            setTimeout(() => {
                this.context.router.transitionTo(linkTo('list'));
            }, 0);
        }
    }

    createInitialFormValues(item) {
        return item;
    }

    render() {
        const { handleSubmit, submitting, valid, item, error, dirty, submitSucceeded, reset } = this.props;

        return(
            <div className="row">
                <NavigationPrompt when={dirty && !submitSucceeded} message="Are you sure? Any unsaved changes will be lost." />
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{item.name ? item.name : 'Create new {{ucName}}'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form ref={form => this.form = form} onSubmit={handleSubmit(this.submit)} className="form-horizontal">
                        <Field
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            component={InputField}
                        />
                        {/* Fields... */}
                        <div className="row">
                            <FormControls
                                valid={valid}
                                submitting={submitting}
                                dirty={dirty}
                                cancelLink={linkTo('list')}
                                onReset={reset}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

{{ucName}}Edit.contextTypes = {
    router: PropTypes.object
};

export default reduxForm({
    form: '{{name}}'
})({{ucName}}Edit);
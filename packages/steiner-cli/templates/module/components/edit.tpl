import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavigationPrompt } from 'react-router';
import { FormControls, formHelper } from 'steiner';
import InputField from 'vivi/lib/Form/InputField';
{% if richComponents %}import Helmet from 'react-helmet';{% endif %}

import { actionTypes } from '../actions/{{name}}';
import routeRegister from 'helpers/routeRegister';
{% if richComponents %}import KeyBinderHoc from 'components/KeyBinder';{% endif %}

{%- set componentName = name | title + 'Edit' %}

class {{componentName}} extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    componentWillMount() {
        this.props.initialize(this.createInitialFormValues(this.props.item));

        {% if richComponents -%}
        this.props.bindShortcut(['ctrl+s', 'command+s'], (e) => {
            e.preventDefault();
            this.props.handleSubmit(this.submit)();
        }, true);
        {%- endif %}
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
                this.context.router.transitionTo(routeRegister.getLinkTo('{{name}}.list'));
            }, 0);
        }
    }

    createInitialFormValues(item) {
        return item;
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new {{name | title}}';
    }

    render() {
        const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset } = this.props;

        return(
            <div className="row">
                {% if richComponents %}<Helmet title={`{{name | title}} > ${this.getTitle()}`} />{% endif %}
                <NavigationPrompt when={dirty && !submitSucceeded} message="Are you sure? Any unsaved changes will be lost." />
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{this.getTitle()}</h3>
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
                                cancelLink={routeRegister.getLinkTo('{{name}}.list')}
                                onReset={reset}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

{{componentName}}.contextTypes = {
    router: PropTypes.object
};

{% if richComponents -%}
    const {{componentName}}Keyed = KeyBinderHoc({{componentName}});
    {%- set componentName = componentName + 'Keyed' -%}
{%- endif %}

export default reduxForm({
    form: '{{name}}'
})({{componentName}});
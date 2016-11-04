import React, { Component, PropTypes } from 'react';
import { NavigationPrompt } from 'react-router';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import FormControls from './FormControls';
import KeyBinderHoc from './KeyBinderHoc';

export class FormWrapper extends Component {
    componentWillMount() {
        const { item } = this.props;

        this.props.initialize(this.props.createInitialFormValues(item));

        this.props.bindShortcut(['ctrl+s', 'command+s'], (e) => {
            e.preventDefault();
            this.props.handleSubmit(this.props.submit)();
        }, true);
    }

    componentDidMount() {
        this.form.elements[0].focus();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item && nextProps.item.id !== this.props.item.id)  {
            this.props.initialize(this.props.createInitialFormValues(nextProps.item));
        }

        if (this.props.goBackAfterSave) {
            if (nextProps.submitSucceeded) {
                setTimeout(() => {
                    this.context.router.transitionTo(this.props.cancelLink);
                }, 0);
            }
        }
    }

    render() {
        const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset } = this.props;

        return (
            <div className="row">
                <NavigationPrompt when={dirty && !submitSucceeded} message={this.props.unsavedMessage} />
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{this.props.title}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form ref={form => this.form = form} onSubmit={handleSubmit(this.props.submit)} className="form-horizontal">
                        <div>
                            {this.props.children}
                        </div>
                        <div className="row">
                            <FormControls
                                valid={valid}
                                submitting={submitting}
                                dirty={dirty}
                                cancelLink={this.props.cancelLink}
                                onReset={reset}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

FormWrapper.propTypes = {
    cancelLink: PropTypes.string,
    createInitialFormValues: PropTypes.func,
    goBackAfterSave: PropTypes.bool,
    title: PropTypes.string,
    submit: PropTypes.func,
    unsavedMessage: PropTypes.string
};

FormWrapper.defaultProps = {
    createInitialFormValues: (item) => item,
    goBackAfterSave: true,
    unsavedMessage: 'Are you sure? Any unsaved changes will be lost.'
};

FormWrapper.contextTypes = {
    router: PropTypes.object
};

const FormWrapperKeyed = KeyBinderHoc(FormWrapper);

export default TranslatorHoc(FormWrapperKeyed, {
    unsavedMessage: 'steiner.messages.confirmUnsaved'
});
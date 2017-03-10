import React, { Component, PropTypes } from 'react';
import { Prompt } from 'react-router-dom';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import FormControls from './FormControls';
import KeyBinderHoc from './KeyBinderHoc';

export class FormWrapper extends Component {
    // componentWillMount() {
    //     const { item } = this.props;

    //     this.props.initialize(this.props.createInitialFormValues(item));

    //     this.props.bindShortcut(['ctrl+s', 'command+s'], (e) => {
    //         e.preventDefault();
    //         this.props.handleSubmit(this.props.submit)();
    //     }, true);
    // }

    componentDidMount() {
        this.form.elements[0].focus();

        this.props.bindShortcut(['ctrl+s', 'command+s'], (e) => {
            e.preventDefault();
            this.props.handleSubmit(this.props.submit)();
        }, true);
    }

    componentWillReceiveProps(nextProps) {
        // TODO: still necessary to permit to go from /item/2 to /item/3 ??
        // if (nextProps.item && nextProps.item.id !== this.props.item.id)  {
        //     this.props.initialize(this.props.createInitialFormValues(nextProps.item));
        // }

        if (this.props.goBackAfterSave) {
            if (nextProps.submitSucceeded && this.props.submitSucceeded === false) {
                setTimeout(() => {
                    if (this.props.submitSucceeded) {
                        this.context.router.push(this.props.cancelLink);
                    }
                }, 100);
            }
        }
    }

    render() {
        const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset, /*innerClass,*/ outerControlsClass } = this.props;

        return (
            <div>
                <Prompt when={dirty && !submitSucceeded} message={this.props.unsavedMessage} />
                {error && <div className="alert alert-danger">{error}</div>}
                <form ref={form => this.form = form} onSubmit={handleSubmit(this.props.submit)} className="form-horizontal">
                    <div>
                        {this.props.children}
                    </div>
                    <div className={outerControlsClass}>
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
        );
    }
}

FormWrapper.propTypes = {
    cancelLink: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    // createInitialFormValues: PropTypes.func,
    goBackAfterSave: PropTypes.bool,
    outerControlsClass: PropTypes.string,
    // title: PropTypes.any,
    submit: PropTypes.func,
    unsavedMessage: PropTypes.string
};

FormWrapper.defaultProps = {
    // createInitialFormValues: (item) => item,
    goBackAfterSave: true,
    outerControlsClass: 'row',
    unsavedMessage: 'Are you sure? Any unsaved changes will be lost.'
};

FormWrapper.contextTypes = {
    router: PropTypes.object
};

const FormWrapperKeyed = KeyBinderHoc(FormWrapper);

export default TranslatorHoc(FormWrapperKeyed, {
    unsavedMessage: 'steiner.messages.confirmUnsaved'
});
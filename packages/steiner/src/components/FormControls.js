import React, { Component, PropTypes } from 'react';
import LoadingButton from 'vivi/lib/LoadingButton';
import { Link } from 'react-router';

export default class FormControls extends Component {
    render() {
        const { submitting, dirty, valid, cancelLink, onReset } = this.props;

        const cancelLabel = this.context.steiner ? this.context.steiner.messages.cancel : 'Cancel';
        const resetLabel = this.context.steiner ? this.context.steiner.messages.reset : 'Reset';
        const submitLabel = this.context.steiner ? this.context.steiner.messages.submit : 'Submit';

        return(
            <div>
                <div className="col-xs-3">
                    {submitting
                        ? <a className="btn btn-primary btn-block" disabled>{cancelLabel}</a>
                        : <Link to={cancelLink} className="btn btn-primary btn-block">{cancelLabel}</Link>
                    }
                </div>
                <div className="col-xs-3">
                    {(submitting || ! dirty)
                        ? <a className="btn btn-warning btn-block" disabled>{resetLabel}</a>
                        : <a onClick={onReset} className="btn btn-warning btn-block">{resetLabel}</a>
                    }
                </div>
                <div className="col-xs-6">
                    <LoadingButton
                        className="btn-success btn-block"
                        disabled={! valid}
                        loading={submitting}
                    >
                        {submitLabel}
                    </LoadingButton>
                </div>
            </div>
        )
    }
}

FormControls.propTypes = {
    cancelLink: PropTypes.string,
    dirty: PropTypes.bool,
    onReset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
};

FormControls.contextTypes = {
    steiner: PropTypes.object
};
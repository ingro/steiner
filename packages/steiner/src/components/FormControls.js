import React, { Component, PropTypes } from 'react';
import LoadingButton from 'vivi/lib/LoadingButton';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import { Link } from 'react-router-dom';

export class FormControls extends Component {
    render() {
        const { cancelLabel, submitting, submitLabel, dirty, /*valid,*/ cancelLink, onReset, resetLabel } = this.props;

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
                        // disabled={! valid}
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
    cancelLabel: PropTypes.string,
    cancelLink: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    dirty: PropTypes.bool,
    onReset: PropTypes.func,
    resetLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    submitting: PropTypes.bool
    // valid: PropTypes.bool
};

FormControls.defaultProps = {
    cancelLabel: 'Cancel',
    resetLabel: 'Reset',
    submitLabel: 'Submit'
};

export default TranslatorHoc(FormControls, {
    cancelLabel: 'steiner.labels.cancel',
    resetLabel: 'steiner.labels.reset',
    submitLabel: 'steiner.labels.submit'
});
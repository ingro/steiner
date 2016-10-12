import React, { Component, PropTypes } from 'react';
import LoadingButton from 'vivi/lib/LoadingButton';
import { Link } from 'react-router';

export default class FormControls extends Component {
    render() {
        const { submitting, dirty, valid, cancelLink, onReset } = this.props;

        return(
            <div>
                <div className="col-xs-3">
                    {submitting
                        ? <a className="btn btn-primary btn-block" disabled>Cancel</a>
                        : <Link to={cancelLink} className="btn btn-primary btn-block">Cancel</Link>
                    }
                </div>
                <div className="col-xs-3">
                    {(submitting || ! dirty)
                        ? <a className="btn btn-warning btn-block" disabled>Reset</a>
                        : <a onClick={onReset} className="btn btn-warning btn-block">Reset</a>
                    }
                </div>
                <div className="col-xs-6">
                    <LoadingButton
                        className="btn-success btn-block"
                        disabled={! valid}
                        loading={submitting}
                    >
                        Submit
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

import React, { Component, PropTypes } from 'react';
import LoadingButton from 'vivi/dist/LoadingButton';
import { Link } from 'react-router';

export default class FormControls extends Component {
    render() {
        const { submitting, cancelLink } = this.props;

        return(
            <div>
                <div className="col-xs-6">
                    {submitting
                        ? <button className="btn btn-primary btn-block" disabled>Cancel</button>
                        : <Link to={cancelLink} className="btn btn-primary btn-block">Cancel</Link>
                    }
                </div>
                <div className="col-xs-6">
                    <LoadingButton
                        className="btn-success btn-block"
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
    submitting: PropTypes.bool,
    cancelLink: PropTypes.string
};

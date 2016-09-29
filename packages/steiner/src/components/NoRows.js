import React, { Component, PropTypes } from 'react';

export default class NoRows extends Component {
    render() {
        const { errorMsg, isFetching, loadingMsg, noRowsMsg, itemsNumber } = this.props;

        if (isFetching && itemsNumber === 0) {
            return <div className="alert alert-info text-center">{loadingMsg}</div>;
        }

        if (errorMsg) {
            return <div className="alert alert-danger text-center">
                {errorMsg}
            </div>;
        }

        return <div className="alert alert-warning text-center">{noRowsMsg}</div>;
    }
}

NoRows.propTypes = {
    errorMsg: PropTypes.string,
    isFetching: PropTypes.bool,
    itemsNumber: PropTypes.number,
    loadingMsg: PropTypes.string,
    noRowsMsg: PropTypes.string
};

NoRows.defaultProps = {
    loadingMsg: 'Loading...',
    noRowsMsg: 'No items to show'
};
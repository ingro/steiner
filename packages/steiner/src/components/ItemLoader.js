import React, { Component, PropTypes } from 'react';

export default class ItemLoader extends Component {
    componentDidMount() {
        if (this.props.params.id === 'create') {
            this.props.resetCurrent();
        } else {
            this.props.fetch(this.props.params.id);
        }
    }

    render() {
        const { component, errorMessage, isFetching, item } = this.props;

        const loadingLabel = this.context.steiner ? this.context.steiner.messages.loadingMsg : 'Loading...';

        if (! isFetching && errorMessage) {
            return <div className="container">
                <div className="alert alert-danger">
                    <h4>{errorMessage}</h4>
                </div>
            </div>
        }

        return ! item || isFetching
            ? <div className="container">
                <div className="alert alert-info">
                    <h4>{loadingLabel}</h4>
                </div>
            </div>
            : React.createElement(component, this.props);
    }
}

ItemLoader.propTypes = {
    component: PropTypes.any,
    errorMessage: PropTypes.string,
    fetch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    item: PropTypes.object,
    params: PropTypes.object,
    resetCurrent: PropTypes.func.isRequired
};

ItemLoader.contextTypes = {
    steiner: PropTypes.object
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

export class ItemLoader extends Component {
    componentDidMount() {
        if (this.props.match.params.id === 'create') {
            this.props.resetCurrent();
        } else {
            if (this.props.loadFromStore) {
                if (this.props.item) {
                    return;
                }
            } 
                
            this.props.fetch(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.resetCurrent();
    }

    render() {
        const { component, errorMessage, isFetching, item, loadingLabel } = this.props;

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
    loadFromStore: PropTypes.bool,
    loadingLabel: PropTypes.string,
    params: PropTypes.object,
    resetCurrent: PropTypes.func.isRequired
};

ItemLoader.defaultProps = {
    loadFromStore: false,
    loadingLabel: 'Loading...'
};

export default TranslatorHoc(ItemLoader, {
    loadingLabel: 'steiner.messages.loading'
});
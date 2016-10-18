import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';

import routeRegister from 'helpers/routeRegister';

export default class OffersListFilter extends Component {
    render() {
        const { filters } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        onChange={this.props.updateFilter}
                    />
                </div>
                <div className="col-xs-8 text-right">
                    <Link className="btn btn-success" to={routeRegister.getLinkTo('offers.create')}>Create</Link>
                </div>
            </div>
        );
    }
}

OffersListFilter.propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func
};

OffersListFilter.contextTypes = {
    router: PropTypes.object
};


import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { InputListFilter } from 'steiner';
import { linkTo } from '../routes/offers';

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
                <div className="col-xs-4 text-right">
                    <Link className="btn btn-success" to={linkTo('create')}>Create</Link>
                </div>
            </div>
        );
    }
}

OffersListFilter.propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func
};
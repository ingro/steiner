import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';

import { linkTo } from '../routes/hotels';

export default class HotelsListFilter extends Component {
    componentDidMount() {
        this.filter.input.focus();
    }

    render() {
        const { filters, isFetching, items } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        ref={filter => this.filter = filter}
                        value={filters.q}
                        onChange={this.props.updateFilter}
                    />
                </div>
                <div className="col-xs-4 text-right">
                    <Link className="btn btn-success" to={linkTo('create')}>Create</Link>
                </div>
                {(isFetching && items.length > 0) &&
                    <div className="col-xs-4">
                        <div className="pull-right"><i className="fa fa-spin fa-spinner" /> Loading...</div>
                    </div>
                }
            </div>
        );
    }
}

HotelsListFilter.propTypes = {
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    updateFilter: PropTypes.func
};
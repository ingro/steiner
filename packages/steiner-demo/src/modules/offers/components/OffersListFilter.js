import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { InputListFilter } from 'steiner';
import Select from 'vivi/lib/Select';

import routeRegister from 'helpers/routeRegister';

export default class OffersListFilter extends Component {
    handleChangeSelect = (key, option) => {
        if (option) {
            this.props.updateFilter(key, parseInt(option.value, 10));
        } else {
            this.props.updateFilter(key, null);
        }        
    }

    render() {
        const { filters } = this.props;

        return (
            <div className="row">
                <div className="col-xs-3">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={this.props.updateFilter}
                    />
                </div>
                <div className="col-xs-7">
                    <div className="row">
                        <div className="col-xs-4">
                            <Select 
                                value={filters.hotelsId}
                                options={[{value: 9, label: 'Hotel 9'}, {value: 21, label: 'Hotel 21'}]}
                                onChange={this.handleChangeSelect.bind(this, 'hotelsId')}
                            />
                        </div>
                        <div className="col-xs-4">
                            <InputListFilter
                                autofocus={false}
                                fieldKey="priceMin"
                                parseInt={true}
                                value={filters.priceMin} 
                                updateFilter={this.props.updateFilter}
                                placeholder="Prezzo minimo" 
                                
                            />
                        </div>
                        <div className="col-xs-4">
                            <InputListFilter
                                autofocus={false}
                                fieldKey="priceMax"
                                parseInt={true}
                                value={filters.priceMax}
                                updateFilter={this.props.updateFilter}
                                placeholder="Prezzo massimo" 
                                
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xs-2 text-right">
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


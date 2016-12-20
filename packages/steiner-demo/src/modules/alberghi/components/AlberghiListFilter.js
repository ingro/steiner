import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InputListFilter from 'steiner/lib/components/InputListFilter';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
import Select from 'vivi/lib/Select';

import routeRegister from 'helpers/routeRegister';

export class AlberghiListFilter extends Component {
    handleChangeSelect = (key, option) => {
        if (option) {
            this.props.updateFilter(key, parseInt(option.value, 10));
        } else {
            this.props.updateFilter(key, null);
        }        
    }

    render() {
        const { createLabel, filters, inputListFilterPlaceholder } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={this.props.updateFilter}
                        placeholder={inputListFilterPlaceholder}
                    />
                </div>
                <div className="col-xs-3">
                    <Select 
                        value={filters.categoryId}
                        options={[{value: '1', label: 1}, {value: '2', label: 2}, {value: '3', label: 3}, {value: '4', label: 4}]}
                        onChange={this.handleChangeSelect.bind(this, 'categoryId')}
                        placeholder="Select a category"
                    />
                </div>
                <div className="col-xs-3">
                    <Select 
                        value={filters.positionId}
                        options={[{value: '1', label: 1}, {value: '2', label: 2}, {value: '3', label: 3}, {value: '4', label: 4}, {value: '5', label: 5}]}
                        onChange={this.handleChangeSelect.bind(this, 'positionId')}
                        placeholder="Select a position"
                    />
                </div>
                <div className="col-xs-2 text-right">
                    <Link className="btn btn-success" to={routeRegister.getLinkTo('alberghi.create')}>{createLabel}</Link>
                </div>
            </div>
        );
    }
}

AlberghiListFilter.propTypes = {
    createLabel: PropTypes.string,
    filters: PropTypes.object,
    inputListFilterPlaceholder: PropTypes.string,
    updateFilter: PropTypes.func
};

AlberghiListFilter.defaultProps = {
    createLabel: 'Create',
    inputListFilterPlaceholder: 'Type to search...'
};

AlberghiListFilter.contextTypes = {
    router: PropTypes.object
};

export default TranslatorHoc(AlberghiListFilter, {
    createLabel: 'steiner.labels.create',
    inputListFilterPlaceholder: 'steiner.labels.searchPlaceholder'
});
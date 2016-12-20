import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InputListFilter from 'steiner/lib/components/InputListFilter';

import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import routeRegister from 'helpers/routeRegister';

export class AlberghiListFilter extends Component {
    

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
                <div className="col-xs-8 text-right">
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
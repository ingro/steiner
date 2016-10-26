import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';
// import Tooltip from 'vivi/lib/Tooltip';

import routeRegister from 'helpers/routeRegister';
import KeyBinderHoc from 'components/KeyBinder';

class HotelsListFilter extends Component {
    componentWillMount() {
        this.props.bindShortcut(['ctrl+d', 'command+d'], (e) => {
            e.preventDefault();
            this.context.router.transitionTo(routeRegister.getLinkTo('hotels.create'));
        }, true);
    }

    handleBatchAction = (e) => {
        e.preventDefault();

        alert(`BATCH ACTION on items ${this.props.selected}`);
    }
    
    render() {
        const { createLabel, filters, selected, updateFilter, inputListFilterPlaceholder } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={updateFilter}
                        placeholder={inputListFilterPlaceholder}
                    />
                </div>
                <div className="col-xs-4">
                    {selected.length > 0 &&
                       <button className="btn btn-info" onClick={this.handleBatchAction}>
                            Batch action
                        </button>
                    }
                </div>
                <div className="col-xs-4 text-right">
                    {/*<Tooltip position="left" enterDelay={0.5} content="Crea un nuovo hotel (CTRL+D)">*/}
                        <Link className="btn btn-success" to={routeRegister.getLinkTo('hotels.create')}>{createLabel}</Link>
                    {/*</Tooltip>*/}
                </div>
            </div>
        );
    }
}

HotelsListFilter.propTypes = {
    createLabel: PropTypes.string,
    filters: PropTypes.object,
    inputListFilterPlaceholder: PropTypes.string,
    updateFilter: PropTypes.func
};

HotelsListFilter.defaultProps = {
    createLabel: 'Create',
    inputListFilterPlaceholder: 'Type to search...'
};

HotelsListFilter.contextTypes = {
    router: PropTypes.object
};

const KeyedHotelsListFilter = KeyBinderHoc(HotelsListFilter);

export default TranslatorHoc(KeyedHotelsListFilter, {
    createLabel: 'steiner.labels.create',
    inputListFilterPlaceholder: 'steiner.labels.searchPlaceholder'
});
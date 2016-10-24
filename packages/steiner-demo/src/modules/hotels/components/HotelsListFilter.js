import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';
import Tooltip from 'vivi/lib/Tooltip';

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
        const { filters, selected, updateFilter } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        value={filters.q}
                        updateFilter={updateFilter}
                        placeholder={this.context.steiner.messages.inputListFilterPlaceholder}
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
                    <Tooltip position="left" enterDelay={0.5} content="Crea un nuovo hotel (CTRL+D)">
                        <Link className="btn btn-success" to={routeRegister.getLinkTo('hotels.create')}>{this.context.steiner.messages.create}</Link>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

HotelsListFilter.propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func
};

HotelsListFilter.contextTypes = {
    router: PropTypes.object
};

HotelsListFilter.contextTypes = {
    steiner: PropTypes.object
};

export default KeyBinderHoc(HotelsListFilter);
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { InputListFilter } from 'steiner';
import Tooltip from 'vivi/dist/Tooltip';

import { linkTo } from '../routes/hotels';
import KeyBinderHoc from 'components/KeyBinder';

class HotelsListFilter extends Component {
     componentWillMount() {
        this.props.bindShortcut(['ctrl+d', 'command+d'], (e) => { 
            e.preventDefault(); 
            this.context.router.transitionTo(linkTo('create'));
        }, true);
    }

    componentDidMount() {
        this.filter.input.focus();
    }

    render() {
        const { filters } = this.props;

        return (
            <div className="row">
                <div className="col-xs-4">
                    <InputListFilter
                        ref={filter => this.filter = filter}
                        value={filters.q}
                        onChange={this.props.updateFilter}
                    />
                </div>
                <div className="col-xs-8 text-right">
                    <Tooltip position="left" enterDelay={0.5} content="Crea un nuovo hotel (CTRL+D)">
                        <Link className="btn btn-success" to={linkTo('create')}>Create</Link>
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

export default KeyBinderHoc(HotelsListFilter);
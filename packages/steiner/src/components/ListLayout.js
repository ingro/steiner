import React, { Component, PropTypes } from 'react';
import Paginator from 'vivi/dist/Paginator';

export default class ListLayout extends Component {
    componentDidMount() {
        this.props.list();
    }

    handleChangePage = (page) => {
        this.props.changePage(page);
    }

    render() {
        const { filters, total, isFetching, items, filterComponent, tableComponent } = this.props;

        return (
            <div className="container">
                {React.createElement(filterComponent, this.props)}
                <div className="row">
                    <div className="col-xs-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-8">
                        <Paginator current={filters.page} pageSize={filters.perPage} total={total} showStatusText={true} onChange={this.handleChangePage}/>
                    </div>
                    <div className="col-xs-4">
                        {(isFetching && items.length > 0) &&
                            <div className="pull-right"><i className="fa fa-spin fa-spinner" /> Loading...</div>
                        }
                    </div>
                </div>
                {React.createElement(tableComponent, this.props)}
            </div>
        );
    }
}

ListLayout.propTypes = {
    changePage: PropTypes.func,
    filterComponent: PropTypes.func,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    list: PropTypes.func,
    tableComponent: PropTypes.func,
    total: PropTypes.number
};
import React, { Component, PropTypes } from 'react';
import Table from 'vivi/lib/Table';

import NoRows from './NoRows';

export default class ListTable extends Component {
    handleSort = (data) => {
        const { sortBy, sortDirection } = data;
        this.props.onChangeOrder(sortBy, sortDirection);
    }

    getNoRowsRenderer = () => {
        const { errorMessage, isFetching, items } = this.props;

        return <NoRows
            errorMsg={errorMessage}
            isFetching={isFetching}
            itemsNumber={items.length}
        />;
    }

    render() {
        const { filters, items } = this.props;

        return (
            <Table
                bordered={true}
                rowCount={items.length}
                columns={this.props.columns}
                rowGetter={({ index }) => items[index]}
                rowHeight={55}
                noRowsRenderer={this.getNoRowsRenderer}
                sortBy={filters.order.key}
                sortDirection={filters.order.direction}
                onSort={this.handleSort}
            />
        );
    }
}

ListTable.propTypes = {
    columns: PropTypes.array,
    delete: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    onChangeOrder: PropTypes.func
};
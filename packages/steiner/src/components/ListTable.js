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

    rowGetter = ({ index }) => this.props.items[index]

    isSelected = (index) => {
        const item = this.rowGetter({ index });

        if (item) {
            const find = this.props.selected.indexOf(item.id);

            if (find > -1) {
                return true;
            }
        }

        return false;
    }

    onRowCheckClick = (rowData, checked) => {
        if (checked) {
            this.props.selectItems(rowData.id);
        } else {
            this.props.deselectItems(rowData.id);
        }
    }

    onHeaderCheckClick = (checked) => {
        const ids = this.props.items.map(item => item.id);

        if (checked) {
            this.props.selectItems(ids);
        } else {
            this.props.deselectItems(ids);
        }
    }

    render() {
        const { filters, items, selected, selectable } = this.props;

        return (
            <Table
                bordered={true}
                rowCount={items.length}
                columns={this.props.columns}
                rowGetter={this.rowGetter}
                rowHeight={55}
                noRowsRenderer={this.getNoRowsRenderer}
                sortBy={filters.order.key}
                sortDirection={filters.order.direction}
                onSort={this.handleSort}
                selectable={selectable}
                isSelected={this.isSelected}
                selectedRowsCount={selected.length}
                onRowCheckClick={this.onRowCheckClick}
                onHeaderCheckClick={this.onHeaderCheckClick}
            />
        );
    }
}

ListTable.propTypes = {
    columns: PropTypes.array,
    delete: PropTypes.func,
    deselectItems: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    onChangeOrder: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    selectItems: PropTypes.func
};

ListTable.defaultProps = {
    selectable: true
};
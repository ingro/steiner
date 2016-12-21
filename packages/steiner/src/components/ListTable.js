import React, { Component, PropTypes } from 'react';
import Table from 'vivi/lib/Table';

import NoRows from './NoRows';

export default class ListTable extends Component {
    handleSort = (data) => {
        const { sortBy, sortDirection } = data;
        this.props.onChangeOrder(sortBy, sortDirection);
    }

    getNoRowsRenderer = () => {
        const { errorMessage, isFetching, items, loadingMsg, noRowsMsg } = this.props;

        return <NoRows
            errorMsg={errorMessage}
            loadingMsg={loadingMsg}
            noRowsMsg={noRowsMsg}
            isFetching={isFetching}
            itemsNumber={items.length}
        />;
    }

    rowGetter = ({ index }) => this.props.items[index]

    isSelected = (index) => {
        const item = this.rowGetter({ index });

        if (item) {
            const find = this.props.selected.indexOf(item[this.props.itemKeyName]);

            if (find > -1) {
                return true;
            }
        }

        return false;
    }

    onRowCheckClick = (rowData, checked) => {
        const { select, deselect, itemKeyName } = this.props;

        if (checked) {
            select(rowData[itemKeyName]);
        } else {
            deselect(rowData.itemKeyName);
        }
    }

    onHeaderCheckClick = (checked) => {
        if (checked) {
            this.props.selectAll();
        } else {
            this.props.deselectAll();
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
                sortBy={filters.orderKey}
                sortDirection={filters.orderDirection}
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
    deselect: PropTypes.func,
    deselectAll: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    itemKeyName: PropTypes.string,
    items: PropTypes.array,
    loadingMsg: PropTypes.string,
    noRowsMsg: PropTypes.string,
    onChangeOrder: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    select: PropTypes.func,
    selectAll: PropTypes.func
};

ListTable.defaultProps = {
    itemKeyName: 'id',
    selectable: true
};
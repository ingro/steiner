import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { ListTable, confirm } from 'steiner';
import TranslatorHoc from 'vivi/lib/TranslatorHoc';

import routeRegister from 'helpers/routeRegister';

export class AlberghiListTable extends Component {
    handleDelete = (id) => {
        this.props.dispatch(confirm.actions.showConfirmDialog({
            message: this.props.confirmDeleteMessage,
            onSuccess: () => this.props.delete(id)
        }));
    }

    getColumns() {
        return [
            {
                width: 100,
                label: 'ID',
                dataKey: 'id',
                flexGrow: 0
            },
            {
                label: 'Name',
                dataKey: 'name',
                flexGrow: 1
            },
            {
                width: 100,
                label: 'Category',
                dataKey: 'categorieId',
                flexGrow: 0
            },
            {
                width: 100,
                label: 'Position',
                dataKey: 'positionId',
                flexGrow: 0
            },
            {
                width: 200,
                label: this.props.actionsLabel,
                dataKey: 'id',
                flexGrow: 0,
                cellRenderer: ({ cellData }) => (<div>
                    <Link className="btn btn-primary" to={routeRegister.getLinkTo('alberghi.edit', { id: cellData })}>{this.props.editLabel}</Link>
                    {' '}
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this, cellData)}><i className="fa fa-times" /></button>
                </div>)
            }
        ];
    }

    render() {
        const { loadingMsg, noRowsMsg, changeOrder } = this.props;

        return (
            <ListTable
                {...this.props}
                columns={this.getColumns()}
                onChangeOrder={changeOrder}
                loadingMsg={loadingMsg}
                noRowsMsg={noRowsMsg}
            />
        );
    }
}

AlberghiListTable.propTypes = {
    actionsLabel: PropTypes.string,
    changeOrder: PropTypes.func,
    confirmDeleteMessage: PropTypes.string,
    delete: PropTypes.func,
    editLabel: PropTypes.string,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    loadingMsg: PropTypes.string,
    noRowsMsg: PropTypes.string
};

AlberghiListTable.defaultProps = {
    actionsLabel: 'Actions',
    confirmDeleteMessage: 'Do you really want to delete the selected item?',
    editLabel: 'Edit',
    loadingMsg: 'Loading...',
    noRowsMsg: 'No items to show'
};

export default TranslatorHoc(AlberghiListTable, {
    actionsLabel: 'steiner.labels.actions',
    confirmDeleteMessage: 'steiner.messages.confirmDelete',
    editLabel: 'steiner.labels.edit',
    loadingMsg: 'steiner.messages.loading',
    noRowsMsg: 'steiner.messages.noRows'
});
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListTable, createConfirm } from 'steiner';

import routeRegister from 'helpers/routeRegister';

export default class HotelsListTable extends Component {
    handleDelete = (id) => {
        this.props.dispatch(createConfirm({
            title: 'Confirmation needed',
            message: 'Si conferma l\'eliminazione dell\'oggetto?',
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
                label: 'Position',
                dataKey: 'position',
                flexGrow: 1,
                cellRenderer: ({ cellData }) => <div>
                    {cellData.name}
                </div>
            },
            {
                width: 100,
                label: 'Active',
                dataKey: 'active',
                flexGrow: 0
            },
            {
                width: 200,
                label: 'Actions',
                dataKey: 'id',
                flexGrow: 0,
                cellRenderer: ({ cellData }) => <div>
                    <Link className="btn btn-primary" to={routeRegister.getLinkTo('hotels.edit', { id: cellData })}>Edit</Link>
                    {' '}
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this, cellData)}><i className="fa fa-times" /></button>
                </div>
            }
        ];
    }

    render() {
        return (
            <ListTable
                {...this.props}
                columns={this.getColumns()}
                onChangeOrder={this.props.changeOrder}
            />
        );
    }
}

HotelsListTable.propTypes = {
    changeOrder: PropTypes.func,
    delete: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array
};
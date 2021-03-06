import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListTable, createConfirm } from 'steiner';

import routeRegister from 'helpers/routeRegister';

export default class OffersListTable extends Component {
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
                label: 'Title',
                dataKey: 'title',
                flexGrow: 1
            },
            {
                width: 100,
                dataKey: 'hotelsId',
                label: 'Hotel ID',
                flexGrow: 0
            },
            {
                width: 150,
                label: 'Price',
                dataKey: 'price',
                flexGrow: 0
            },
            {
                width: 150,
                label: 'Start',
                dataKey: 'start',
                flexGrow: 0
            },
            {
                width: 150,
                label: 'End',
                dataKey: 'end',
                flexGrow: 0
            },
            {
                width: 200,
                label: 'Actions',
                dataKey: 'id',
                flexGrow: 0,
                cellRenderer: ({ cellData }) => <div>
                    <Link className="btn btn-primary" to={routeRegister.getLinkTo('offers.edit', { id: cellData })}>Edit</Link>
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

OffersListTable.propTypes = {
    changeOrder: PropTypes.func,
    delete: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array
};
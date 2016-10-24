import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListTable } from 'steiner';
import helper from 'helpers/steinerHelper';

import routeRegister from 'helpers/routeRegister';

export default class {{name | title}}ListTable extends Component {
    handleDelete = (id) => {
        this.props.dispatch(helper.createConfirmAction({
            message: 'Do you really want to delete the item?',
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
                width: 200,
                label: 'Actions',
                dataKey: 'id',
                flexGrow: 0,
                cellRenderer: ({ cellData }) => <div>
                    <Link className="btn btn-primary" to={routeRegister.getLinkTo('{{name}}.edit', { id: cellData })}>Edit</Link>
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

{{name | title}}ListTable.propTypes = {
    changeOrder: PropTypes.func,
    delete: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array
};
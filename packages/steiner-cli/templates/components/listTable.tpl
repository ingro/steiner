import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import ListTable from 'steiner/dist/components/ListTable';
import { createConfirm } from 'steiner/dist/helpers/notificationCreator';
import { linkTo } from '../routes/${name}';

export default class ${ucName}ListTable extends Component {
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
                width: 200,
                label: 'Actions',
                dataKey: 'id',
                flexGrow: 0,
                cellRenderer: ({ cellData }) => <div>
                    <Link className="btn btn-primary" to={linkTo('edit', { id: cellData })}>Edit</Link>
                    {' '}
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this, cellData)}><i className="fa fa-times" /></button>
                </div>
            }
        ];
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <ListTable
                        {...this.props}
                        columns={this.getColumns()}
                        onChangeOrder={this.props.changeOrder}
                    />
                </div>
            </div>
        );
    }
}

${ucName}ListTable.propTypes = {
    changeOrder: PropTypes.func,
    delete: PropTypes.func,
    errorMessage: PropTypes.string,
    filters: PropTypes.object,
    isFetching: PropTypes.bool,
    items: PropTypes.array
};
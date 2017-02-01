import React, { Component } from 'react';
import Helmet from 'react-helmet';

import HotelsForm from './HotelsForm';
import routeRegister from 'helpers/routeRegister';

export default class HotelsEdit extends Component {
    createInitialFormValues(item) {
        return {
            ...item,
            positionId: item.position ? { value: item.positionId, label: item.position.name } : {},
            tags: [{value: 1, label: 'estate'}, {value: 4, label: 'famiglia'}]
        };
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new Hotels';
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('hotels.list');
    }

    render() {
        const title = this.getTitle();

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Helmet title={`Hotels > ${title}`} />
                    <h3 className="text-center">{title}</h3>
                    <HotelsForm
                        cancelLink={this.getCancelLink()}
                        initialValues={this.createInitialFormValues(this.props.item)}
                    />
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { FormWrapper, formHelper } from 'steiner';

import { actionTypes } from '../actions/offers';
import routeRegister from 'helpers/routeRegister';
import FormBuilder from 'components/FormBuilder';

const schema = [
    {
        name: 'email',
        label: 'Indirizzo email',
        type: 'text'
    },
    {
        name: 'active',
        label: 'Attivo',
        type: 'checkbox'
    },
    {
        name: 'type',
        label: 'Tipologia',
        type: 'select',
        options: [{
            id: 1,
            name: 'Articolo'
        }, {
            id: 2,
            name: 'Commento'
        }]
    },
    {
        name: 'comment',
        label: 'Commento',
        type: 'textarea'
    },
    {
        name: 'theme',
        label: 'Tema',
        type: 'radio',
        options: [{
            value: '1',
            label: 'Bright'
        }, {
            value: '2',
            label: 'Dark'
        }]
    }
];

class OffersEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    createInitialFormValues(item) {
        return {
            email: 'foo@bar.com',
            active: true,
            type: 2,
            comment: 'lorem ipsum',
            theme: '2'
        };
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('offers.list');
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new Offers';
    }

    render() {
        return(
            <div>
                <FormWrapper
                    {...this.props}
                    title={this.getTitle()}
                    cancelLink={this.getCancelLink()}
                    submit={this.submit}
                    createInitialFormValues={this.createInitialFormValues}
                >
                    <FormBuilder schema={schema} />
                </FormWrapper>
            </div>
        );
    }
}

export default reduxForm({
    form: 'offers'
})(OffersEdit);
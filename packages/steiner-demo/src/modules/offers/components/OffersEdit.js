import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { FormWrapper, FormBuilder, formHelper } from 'steiner';

import { actionTypes } from '../actions/offers';
import routeRegister from 'helpers/routeRegister';

const schema = [
    {
        name: 'email',
        type: 'text',
        placeholder: 'Indirizzo email',
        label: 'Indirizzo email'
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
            value: 1,
            label: 'Articolo'
        }, {
            value: 2,
            label: 'Commento'
        }]
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
    },
    {
        name: 'start_date',
        type: 'date',
        label: 'Data inizio'
    },
    {
        name: 'quantity',
        type: 'number',
        label: 'Quantità',
        placeholder: 'Quantita'
    },
    {
        name: 'comment',
        type: 'textarea',
        onlyInput: true
    },
    {
        name: 'hidden_id',
        type: 'hidden'
    }
];

class OffersEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes);
    }

    createInitialFormValues(item) {
        return {
            email: null,
            active: true,
            type: 2,
            comment: 'lorem ipsum',
            theme: '2',
            hidden_id: 42
        };
    }

    getCancelLink() {
        return this.props.previousUrl ? this.props.previousUrl : routeRegister.getLinkTo('offers.list');
    }

    getTitle() {
        const { item } = this.props;

        return item.title ? item.title : 'Create new Offer';
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
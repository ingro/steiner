import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { formHelper, FormWrapper } from 'steiner';
import Helmet from 'react-helmet';
import InputField from 'vivi/lib/Form/InputField';
import CheckboxField from 'vivi/lib/Form/CheckboxField';
import SelectAsyncField from 'vivi/lib/Form/SelectAsyncField';

import {
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';

import client from 'apis/client';
import routeRegister from 'helpers/routeRegister';
import { createReactSelectLoader } from 'helpers/helpers';
import { actionTypes } from '../actions/hotels';

const validate = combineValidators({
    name: composeValidators(
        isRequired('Name'),
        hasLengthGreaterThan(8)({
            message: 'The name must be at least 8 characters long'
        })
    )()
});

class HotelsEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = formHelper.createSubmit(actionTypes, data => ({
            ...data,
            positionId: data.positionId ? data.positionId.id : null
        }));
    }

    // componentWillMount() {
    //     const { item } = this.props;

    //     this.props.initialize(this.createInitialFormValues(item));

    //     this.props.bindShortcut(['ctrl+s', 'command+s'], (e) => {
    //         e.preventDefault();
    //         this.props.handleSubmit(this.submit)();
    //     }, true);
    // }

    // componentDidMount() {
    //     this.form.elements[0].focus();
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.item && nextProps.item.id !== this.props.item.id)  {
    //         this.props.initialize(this.createInitialFormValues(nextProps.item));
    //     }

    //     if (nextProps.submitSucceeded) {
    //         setTimeout(() => {
    //             this.context.router.transitionTo(routeRegister.getLinkTo('hotels.list'));
    //         }, 0);
    //     }
    // }

    createInitialFormValues(item) {
        return {
            ...item,
            positionId: item.position ? { id: item.positionId, name: item.position.name } : {},
            tags: [{id: 1, name: 'estate'}, {id: 4, name: 'famiglia'}]
        };
    }

    getTitle() {
        const { item } = this.props;

        return item.name ? item.name : 'Create new Hotels';
    }

    render() {
        return (
            <div>
                <Helmet title={`Hotels > ${this.getTitle()}`} />
                <FormWrapper
                    {...this.props}
                    title={this.getTitle()}
                    cancelLink={routeRegister.getLinkTo('hotels.list')}
                    submit={this.submit}
                    createInitialFormValues={this.createInitialFormValues}
                >
                    <Field
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        component={InputField}
                    />
                    <Field
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        component={InputField}
                    />
                    <Field
                        className="form-control"
                        name="positionId"
                        placeholder="Position"
                        component={SelectAsyncField}
                        loadOptions={createReactSelectLoader('positions', client)}
                    />
                    <Field
                        className="form-control"
                        name="tags"
                        placeholder="Tags"
                        component={SelectAsyncField}
                        loadOptions={createReactSelectLoader('tags', client)}
                        selectOptions={{ multi: true }}
                    />
                    <Field
                        className="form-control"
                        name="active"
                        component={CheckboxField}
                        type="checkbox"
                    />
                </FormWrapper>
            </div>
        );
    }

    // render() {
    //     const { handleSubmit, submitting, valid, error, dirty, submitSucceeded, reset } = this.props;

    //     return(
    //         <div className="row">
    //             <Helmet title={`Hotels > ${this.getTitle()}`} />
    //             <NavigationPrompt when={dirty && !submitSucceeded} message="Are you sure? Any unsaved changes will be lost." />
    //             <div className="col-xs-6 col-xs-offset-3 text-center">
    //                 <h3>{this.getTitle()}</h3>
    //                 {error && <div className="alert alert-danger">{error}</div>}
    //                 <form ref={form => this.form = form} onSubmit={handleSubmit(this.submit)} className="form-horizontal">
    //                     <Field
    //                         className="form-control"
    //                         name="name"
    //                         placeholder="Name"
    //                         component={InputField}
    //                     />
    //                     <Field
    //                         className="form-control"
    //                         name="address"
    //                         placeholder="Address"
    //                         component={InputField}
    //                     />
    //                     <Field
    //                         className="form-control"
    //                         name="positionId"
    //                         placeholder="Position"
    //                         component={SelectAsyncField}
    //                         loadOptions={createReactSelectLoader('positions', client)}
    //                     />
    //                     <Field
    //                         className="form-control"
    //                         name="tags"
    //                         placeholder="Tags"
    //                         component={SelectAsyncField}
    //                         loadOptions={createReactSelectLoader('tags', client)}
    //                         selectOptions={{ multi: true }}
    //                     />
    //                     <Field
    //                         className="form-control"
    //                         name="active"
    //                         component={CheckboxField}
    //                         type="checkbox"
    //                     />
    //                     <div className="row">
    //                         <FormControls
    //                             valid={valid}
    //                             submitting={submitting}
    //                             dirty={dirty}
    //                             cancelLink={routeRegister.getLinkTo('hotels.list')}
    //                             onReset={reset}
    //                         />
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>
    //     );
    // }
}

// HotelsEdit.contextTypes = {
//     router: PropTypes.object
// };

// const HotelsEditKeyed = KeyBinderHoc(HotelsEdit);

export default reduxForm({
    form: 'hotels',
    validate
})(HotelsEdit);
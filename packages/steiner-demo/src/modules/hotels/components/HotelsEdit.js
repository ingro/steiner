import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from 'vivi/dist/Form/InputField';
import CheckboxField from 'vivi/dist/Form/CheckboxField';
import SelectAsyncField from 'vivi/dist/Form/SelectAsyncField';
import { createReactSelectLoader } from 'steiner/dist/helpers/apiCreator';
import {
    /*createValidator,*/
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';
import { SimpleSelect } from 'react-selectize';
import SelectAsync from 'vivi/dist/SelectAsync';

import client from '../../../apis/client';
import { actionTypes } from '../actions/hotels';
import { FormControls } from 'steiner';
import { createSubmit } from 'steiner/dist/helpers/formHelper';
import { linkTo } from '../routes/hotels';

const validate = combineValidators({
    name: composeValidators(
        isRequired('Name'),
        hasLengthGreaterThan(8)({
            message: 'The name must be at least 8 characters long'
        })
    )()
});

// function searchPositions(search) {
//     this.setState({ search });

//     if (search.length > 0) {
//         client.get('positions')
//             .then(res => {
//                 const options = res.data.data.map(item => ({ label: item.name, value: item.id }));

//                 this.setState({
//                     options
//                 });
//             });
//     }
// }

// class SelectizeField extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             options: [],
//             search: '',
//             value: {}
//         };
//     }

//     render() {
//         console.log(this.props.input);

//         return <SimpleSelect
//             options={this.state.options}
//             search={this.state.search}
//             onValueChange={item => {
//                 this.props.input.onChange(item);
//                 this.setState({ value: item });
//             }}
//             onSearchChange={searchPositions.bind(this)}
//             {...this.props.input}
//             onBlur={() => {}}
//             value={this.state.value}
//         />
//     }
// }

// class SelectField extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             options: props.options || [],
//             value: props.defaultValue || {}
//         };
//     }

//     render() {
//         return <SelectAsync
//             options={this.state.options}
//             loadOptions={q => 
//                 client.get(`/positions?_limit=20&q=${q}`)
//                     .then(res => {
//                         this.setState({ options: res.data.data });
//                         return { options: res.data.data };
//                     })
//             }
//             {...this.props.input}
//             onChange={value => {
//                 this.props.input.onChange(value);
//                 this.setState({ value });
//             }}
//             onBlur={() => {}}
//             value={this.state.value}
//         />;
//     }
// }

class HotelsEdit extends Component {
    constructor(props) {
        super(props);

        this.submit = createSubmit(actionTypes, data => ({
            ...data,
            positionId: data.positionId ? data.positionId.id : null
        }));
    }

    componentWillMount() {
        const { item } = this.props;

        const values = {
            ...item,
            positionId: item.position ? { id: item.positionId, name: item.position.name } : {},
            tags: [{id: 1, name: 'estate'}, {id: 4, name: 'famiglia'}]
        };

        this.props.initialize(values);
    }

    componentWillReceiveProps(props) {
        if (props.submitSucceeded) {
            setTimeout(() => {
                this.context.router.transitionTo(linkTo('list'));
            }, 0);
        }
    }

    render() {
        const { handleSubmit, submitting, valid, item, error } = this.props;

        return(
            <div className="container">
                <div className="col-xs-6 col-xs-offset-3 text-center">
                    <h3>{item.name ? item.name : 'Create new Hotels'}</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.submit)} className="form-horizontal">
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                component={InputField}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="address"
                                placeholder="Address"
                                component={InputField}
                            />
                        </div>
                        {/*<div className="form-group">
                            <Field
                                className="form-control"
                                name="positionId"
                                placeholder="Position"
                                component={SelectAsyncField}
                                loadOptions={createReactSelectLoader('positions', client)}
                                initialLabel={item.position}
                                normalize={value => value && value.id}
                            />
                        </div>*/}
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="positionId"
                                placeholder="Position"
                                component={SelectAsyncField}
                                loadOptions={createReactSelectLoader('positions', client)}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="tags"
                                placeholder="Tags"
                                component={SelectAsyncField}
                                loadOptions={createReactSelectLoader('tags', client)}
                                selectOptions={{ multi: true }}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="active"
                                component={CheckboxField}
                                type="checkbox"
                            />
                        </div>
                        <div className="row">
                            <FormControls
                                valid={valid}
                                submitting={submitting}
                                cancelLink={linkTo('list')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

HotelsEdit.PropTypes = {
    handleSubmit: PropTypes.func
};

HotelsEdit.contextTypes = {
    router: PropTypes.object
};

export default reduxForm({
    form: 'hotels',
    validate
})(HotelsEdit);
import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import InputField from 'vivi/lib/Form/InputField';
import CheckboxField from 'vivi/lib/Form/CheckboxField';
import SelectField from 'vivi/lib/Form/SelectField';
import TextareaField from 'vivi/lib/Form/TextareaField';
import RadioGroupField from 'vivi/lib/Form/RadioGroupField';

export class FormBuilder extends Component {
    renderElement = (item, key) => {
        const { type, name, placeholder } = item;

        switch (type) {
            case 'text':
                return <Field
                    key={key}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    component={InputField}
                />
                break;
            case 'checkbox':
                return <Field
                    key={key}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    controlType={item.checkboxType || this.props.checkboxTypeDefault}
                    component={CheckboxField}
                    type="checkbox"
                />
                break;
            case 'select':
                return <Field
                    key={key}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    options={item.options}
                    component={SelectField}
                />
                break;
            case 'textarea':
                return <Field
                    key={key}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    component={TextareaField}
                />
                break;
            case 'radio':
                return <Field
                    key={key}
                    className="form-control"
                    name={name}
                    placeholder={placeholder}
                    options={item.options}
                    component={RadioGroupField}
                />
                break;
        }
    }

    render() {
        return (
            <div>
                {this.props.schema.map(this.renderElement)}
            </div>
        );
    }
}

FormBuilder.propTypes = {
    checkboxTypeDefault: PropTypes.oneOf(['checkbox', 'switch']),
    schema: PropTypes.array.isRequired
};

FormBuilder.defaultProps = {
    checkboxTypeDefault: 'checkbox'
};

export default FormBuilder;

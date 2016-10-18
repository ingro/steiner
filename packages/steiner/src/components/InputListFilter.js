import React, { Component, PropTypes } from 'react';
import ClearableInput from 'vivi/lib/ClearableInput';
// import DebounceInput from 'react-debounce-input';

export default class InputListFilter extends Component {
    handleQueryInput = (value) => {
        this.props.onChange('q', value);
    }

    render() {
        const { value } = this.props;

        return <ClearableInput
            autofocus={true}
            placeholder="Search"
            value={value}
            onChange={this.handleQueryInput}
        />;
    }
}

InputListFilter.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

// return <DebounceInput
//     minLength={1}
//     debounceTimeout={500}
//     className="form-control"
//     placeholder="Search"
//     value={value}
//     onChange={this.handleQueryInput}
// />;
import React, { Component, PropTypes } from 'react';
// import DebounceInput from 'react-debounce-input';

export default class InputListFilter extends Component {
    handleQueryInput = (event) => {
        this.props.onChange('q', event.target.value);
    }

    render() {
        const { value } = this.props;

        return <input
            className="form-control"
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
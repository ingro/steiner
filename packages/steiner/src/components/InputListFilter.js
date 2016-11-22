import React, { Component, PropTypes } from 'react';
import ClearableInput from 'vivi/lib/ClearableInput';
import debounce from 'lodash/debounce';

export default class InputListFilter extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value
        };

        this.updateFilter = debounce(() => props.updateFilter(props.fieldKey, this.state.value), 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleChange = (value) => {
        if (this.props.parseInt && value !== '') {
            value = parseInt(value, 10);
        }

        this.setState({
            value
        });

        if (value !== this.props.value) {
            this.updateFilter();
        }
    }

    // handleKeyUp = (e) => {
    //     if (e.key === 'Enter') {
    //         if (this.state.value !== this.props.value) {
    //             this.props.updateFilter('q', this.state.value);
    //         }
    //     }
    // }

    render() {
        const { value } = this.state;
        const { autofocus, placeholder } = this.props;

        return <ClearableInput
            autofocus={autofocus}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
        />;
    }
}

InputListFilter.propTypes = {
    autofocus: PropTypes.bool,
    fieldKey: PropTypes.string,
    parseInt: PropTypes.bool,
    placeholder: PropTypes.string,
    updateFilter: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

InputListFilter.defaultProps = {
    autofocus: true,
    fieldKey: 'q',
    parseInt: false,
    placeholder: 'Type to search...'
};
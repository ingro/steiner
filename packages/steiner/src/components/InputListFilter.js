import React, { Component, PropTypes } from 'react';
import ClearableInput from 'vivi/lib/ClearableInput';
import debounce from 'lodash/debounce';

export default class InputListFilter extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value
        };

        this.updateFilter = debounce(() => props.updateFilter(props.key, this.state.value), 500);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleChange = (value) => {
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
        const { placeholder } = this.props;

        return <ClearableInput
            autofocus={true}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChange}
        />;
    }
}

InputListFilter.propTypes = {
    key: PropTypes.string,
    placeholder: PropTypes.string,
    updateFilter: PropTypes.func,
    value: PropTypes.string
};

InputListFilter.defaultProps = {
    key: 'q',
    placeholder: 'Type to search...'
};
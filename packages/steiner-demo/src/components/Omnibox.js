import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Highlight from 'react-highlight-words';

import './Omnibox.css';

class Omnibox extends Component {
    handleChange = (option) => {
        if (option && option.type === 'link') {
            this.context.router.push(option.path);
        }

        this.props.onChange();
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.select) {
                this.select.focus();
            }
        }, 400);
    }

    render() {
        return (
            <div className="Omnibox">
                <Select
                    ref={select => this.select = select}
                    valueKey="id"
                    labelKey="label"
                    options={this.props.options}
                    onChange={this.handleChange}
                    openOnFocus={true}
                    optionRenderer={option => {
                        if (this.select) {
                            return <Highlight searchWords={[this.select.state.inputValue]} textToHighlight={option.label} />;
                        }

                        return <span>{option.label}</span>;
                    }}
                />
            </div>
        );
    }
}

Omnibox.propTypes = {
    options: PropTypes.array
};

Omnibox.defaultProps = {
    options: []
};

Omnibox.contextTypes = {
    router: PropTypes.object
};

export default Omnibox;

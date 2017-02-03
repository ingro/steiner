import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Highlight from 'react-highlighter';

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
                            return <Highlight search={this.select.state.inputValue}>{option.label}</Highlight>;
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

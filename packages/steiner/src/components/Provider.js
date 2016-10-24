import { Component, Children, PropTypes } from 'react';

export default class SteinerProvider extends Component {
    getChildContext() {
        const { locale, messages } = this.props;

        return {
            steiner: {
                locale,
                messages
            }
        };
    }

    render() {
        return Children.only(this.props.children);
    }
}

SteinerProvider.propTypes = {
    children: PropTypes.any.isRequired,
    locale: PropTypes.string,
    messages: PropTypes.object
};

SteinerProvider.defaultProps = {
    locale: 'en',
    messages: {}
};

SteinerProvider.childContextTypes = {
    steiner: PropTypes.object
};
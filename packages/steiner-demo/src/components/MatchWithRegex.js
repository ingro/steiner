import React, { Component, PropTypes } from 'react';
import { Match } from 'react-router';

function checkParams(params, rules = {}) {
    const checks = Object.keys(rules).length;

    if (checks === 0) {
        return true;
    }
    
    let success = 0;

    // console.warn(checks);

    Object.keys(rules).forEach(key => {
        // console.warn(key, rules[key], params[key]);
        const res = rules[key].exec(params[key]);

        if (res) {
            success++;
        }
    });

    return checks === success;
}

class MatchWithRegex extends Component {
    render() {
        const { component: Component, reg, ...rest } = this.props;

        return (
            <Match {...rest} render={matchProps => {
                if (checkParams(matchProps.params, reg)) {
                    return <Component {...matchProps}/>;
                }
                
                return null;
            }} />
        )
    }   
}

export default MatchWithRegex;
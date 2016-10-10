import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
// import Modal from 'react-modal';
// import TetherComponent from 'react-tether';
// import classnames from 'classnames';

import './Omnibox.css';

const options = [
    {
        id: 1,
        type: 'link',
        path: '/hotels',
        label: 'Hotels'
    },
    {
        id: 2,
        type: 'link',
        path: '/hotels/create',
        label: 'Create Hotel'
    },
    {
        id: 3,
        type: 'link',
        path: '/offers',
        label: 'Offers'
    },
    {
        id: 4,
        type: 'link',
        path: '/offers/create',
        label: 'Create Offer'
    }
];

// const style = {
//     overlay: {
//         backgroundColor: 'transparent',
//         // top: -5,
//         // right: 300,
//         // bottom: 'auto',
//         // left: 300
//     },
//     content: {
//         // position: 'fixed',
//         top: -5,
//         right: 300,
//         bottom: 'auto',
//         left: 300,
//         // border: 'none',
//         overflow: 'none'
//     }
// }

// function menuRenderer ({
//     focusedOption,
//     instancePrefix,
//     labelKey,
//     onFocus,
//     onSelect,
//     optionClassName,
//     optionComponent,
//     optionRenderer,
//     options,
//     valueArray,
//     valueKey,
//     onOptionRef
// }) {
//     let Option = optionComponent;

//     return options.map((option, i) => {
//         let isSelected = valueArray && valueArray.indexOf(option) > -1;
//         let isFocused = option === focusedOption;
//         let optionClass = classnames(optionClassName, {
//             'Select-option': true,
//             'is-selected': isSelected,
//             'is-focused': isFocused,
//             'is-disabled': option.disabled,
//         });

//         return (
//             <Option
//                 className={optionClass}
//                 instancePrefix={instancePrefix}
//                 isDisabled={option.disabled}
//                 isFocused={isFocused}
//                 isSelected={isSelected}
//                 key={`option-${i}-${option[valueKey]}`}
//                 onFocus={onFocus}
//                 onSelect={onSelect}
//                 option={option}
//                 optionIndex={i}
//                 ref={ref => { onOptionRef(ref, isFocused); }}
//             >
//                 {optionRenderer(option, i)}
//             </Option>
//         );
//     });
// }

class Omnibox extends Component {
    handleChange = (option) => {
        if (option.type === 'link') {
            this.context.router.transitionTo(option.path);
        }

        this.props.onChange();
    }

    render() {
        return (
            <div className="Omnibox">
                <Select 
                    ref={select => this.select = select}
                    valueKey="id"
                    labelKey="label"
                    options={options}
                    onChange={this.handleChange}
                    autofocus={true}
                />
            </div>
        );
    }
}

Omnibox.contextTypes = {
    router: PropTypes.object
};

export default Omnibox;

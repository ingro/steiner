import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

export default function KeyBinderHoc(Base) {
    return class KeyBinder extends Component {
        constructor(props){
            super(props);
            this.__mousetrapBindings = [];
        }

        bindShortcut (key, callback, global = false) {
            if (global) {
                Mousetrap.bindGlobal(key, callback);
            } else {
                Mousetrap.bind(key, callback);
            }
            
            this.__mousetrapBindings.push(key);
        }

        unbindShortcut (key) {
            const index = this.__mousetrapBindings.indexOf(key);

            if (index > -1) {
                this.__mousetrapBindings.splice(index, 1);
            }

            Mousetrap.unbind(key);
        }

        unbindAllShortcuts () {
            if (this.__mousetrapBindings.length < 1) {
                return;
            }

            this.__mousetrapBindings.forEach((binding) => {
                Mousetrap.unbind(binding);
            });
            this.__mousetrapBindings = [];
        }

        componentWillUnmount () {
            this.unbindAllShortcuts();
        }

        render() {
            return <Base
                {...this.props}
                bindShortcut={this.bindShortcut.bind(this)}
                unbindShortcut={this.unbindShortcut.bind(this)} />;
        }
    }
}
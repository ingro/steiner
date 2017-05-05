import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getCurrentRoute, getPreviousUrl } from '../routing/reducer';

export function connectList(component, actions, selectors, options = {}) {
    function mapStateToProps(state) {
        const list = selectors.listSelector(state);

        const additionalPropsMapped = options.additionalProps ? _.mapValues(options.additionalProps, v => v(state)) : {};

        return {
            ...list,
            filters: selectors.getFilters(state),
            items: selectors.itemsSelector(state),
            selected: selectors.getSelectedId(state),
            currentRoute: getCurrentRoute(state),
            ...additionalPropsMapped
        };
    }

    function mapDispatchToProps(dispatch) {
        const boundedActions = bindActionCreators(actions, dispatch);

        return {
            ...boundedActions,
            dispatch
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export function connectItem(component, actions, selectors, options = {}) {
    _.defaults(options, {
        loadFromStore: false
    });

    function mapStateToProps(state, ownProps) {
        const id = ownProps.match.params.id;
        const isNew = id === 'create';
        const current = selectors.currentSelector(state);

        let item = {};

        if (! isNew) {
            if (options.loadFromStore) {
                item = selectors.itemSelector(state, id);

                if (! item) {
                    item = current.item;
                }
            } else {
                item = current.item;
            }
        }

        const additionalPropsMapped = options.additionalProps ? _.mapValues(options.additionalProps, v => v(state)) : {};
        
        return {
            ...current,
            item,
            previousUrl: getPreviousUrl(state),
            ...additionalPropsMapped
        };
    }

    function mapDispatchToProps(dispatch) {
        const boundedActions = bindActionCreators(actions, dispatch);

        return {
            ...boundedActions,
            dispatch
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default {
    connectItem,
    connectList
};
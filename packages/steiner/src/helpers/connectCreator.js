import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getCurrentRoute, getPreviousUrl } from '../routing/reducer';

export function connectList(component, actions, selectors, additionalProps = {}) {
    function mapStateToProps(state) {
        const list = selectors.listSelector(state);

        const additionalPropsMapped = _.mapValues(additionalProps, v => v(state));

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

export function connectItem(component, actions, selectors) {
    function mapStateToProps(state, ownProps) {
        const current = selectors.currentSelector(state);
        const isNew = ownProps.match.params.id === 'create';

        return {
            ...current,
            item: isNew ? {} : current.item,
            previousUrl: getPreviousUrl(state)
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
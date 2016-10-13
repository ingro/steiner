import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export function connectList(component, actions, selectors) {
    function mapStateToProps(state) {
        const list = selectors.listSelector(state);

        return {
            ...list,
            items: selectors.itemsSelector(state),
            selected: selectors.getSelectedId(state),
            component
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
        const isNew = ownProps.params.id === 'create';

        return {
            ...current,
            item: isNew ? {} : current.item
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(actions, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export default {
    connectItem,
    connectList
};
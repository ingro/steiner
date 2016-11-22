import arrify from 'arrify';
import _ from 'lodash';

function addAsyncGroup(resource, actionTypes, group, options) {
    const upperGroup    = group.toUpperCase();

    resource = _.trim(resource);

    const start        = `${resource}/${upperGroup}`;
    const success      = `${resource}/${upperGroup}_SUCCESS`;
    const fail         = `${resource}/${upperGroup}_FAIL`;
    const startAlias   = group;
    const successAlias = `${group}Success`;
    const failAlias    = `${group}Fail`;

    actionTypes[start]   = start;
    actionTypes[success] = success;
    actionTypes[fail]    = fail;

    if (options.addAlias) {
        actionTypes[startAlias]   = start;
        actionTypes[successAlias] = success;
        actionTypes[failAlias]    = fail;
    }
}

const defaultOptions = {
    addAlias: true,
    clientFilters: false
};

export function createActionTypes(resource, options = {}) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    _.defaults(options, defaultOptions);

    resource = _.trim(resource);

    if (resource === '') {
        throw new Error('Expected resource');
    }

    const actionTypes = {};

    addAsyncGroup(resource, actionTypes, 'list', options);
    addAsyncGroup(resource, actionTypes, 'fetch', options);
    addAsyncGroup(resource, actionTypes, 'create', options);
    addAsyncGroup(resource, actionTypes, 'update', options);
    addAsyncGroup(resource, actionTypes, 'delete', options);

    const resetCurrent     = `${resource}/RESET_CURRENT`;
    const updateFilter     = `${resource}/UDATE_FILTER`;
    const syncFilters      = `${resource}/SYNC_FILTERS`;
    const checkFilterSync  = `${resource}/CHECK_FILTER_SYNC`;
    const setFilters       = `${resource}/SET_FILTERS`;
    const resetFilters     = `${resource}/RESET_FILTERS`;
    const changePage       = `${resource}/CHANGE_PAGE`;
    const changeOrder      = `${resource}/CHANGE_ORDER`;
    const select           = `${resource}/SELECT`;
    const deselect         = `${resource}/DESELECT`;
    const selectAll        = `${resource}/SELECT_ALL`;
    const deselectAll      = `${resource}/DESELECT_ALL`;
    const filterCollection = `${resource}/FILTER_COLLECTION`;

    actionTypes.resetCurrent = resetCurrent;
    actionTypes[resetCurrent] = resetCurrent;

    actionTypes.updateFilter = updateFilter;
    actionTypes[updateFilter] = updateFilter;

    actionTypes.syncFilters = syncFilters;
    actionTypes[syncFilters] = syncFilters;

    actionTypes.checkFilterSync = checkFilterSync;
    actionTypes[checkFilterSync] = checkFilterSync;

    actionTypes.setFilters = setFilters;
    actionTypes[setFilters] = setFilters;

    actionTypes.resetFilters = resetFilters;
    actionTypes[resetFilters] = resetFilters;

    actionTypes.changePage = changePage;
    actionTypes[changePage] = changePage;

    actionTypes.changeOrder = changeOrder;
    actionTypes[changeOrder] = changeOrder;

    actionTypes.select = select;
    actionTypes[select] = select;

    actionTypes.deselect = deselect;
    actionTypes[deselect] = deselect;

    actionTypes.selectAll = selectAll;
    actionTypes[selectAll] = selectAll;

    actionTypes.deselectAll = deselectAll;
    actionTypes[deselectAll] = deselectAll;

    actionTypes.filterCollection = filterCollection;
    actionTypes[filterCollection] = filterCollection;

    return actionTypes;
}

export function createActions(resource, actionTypes) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = _.trim(_.upperFirst(resource));

    const actions = {};

    actions[`fetch`] = function(id) {
        return {
            type: actionTypes.fetch,
            payload: {
                id
            }
        };
    }

    actions[`list`] = function() {
        return {
            type: actionTypes.list,
            loadingBar: 'show'
        };
    }

    actions[`create`] = function(data) {
        return {
            type: actionTypes.create,
            payload: {
                data
            }
        };
    }

    actions['createSuccess'] = function(response, notification) {
        return {
            type: actionTypes.createSuccess,
            payload: response,
            notification
        };
    }

    actions['createFail'] = function(error, notification) {
        return {
            type: actionTypes.createFail,
            error,
            notification
        };
    }

    actions[`update`] = function(id, data) {
        return {
            type: actionTypes.update,
            payload: {
                id,
                data
            }
        };
    }

    actions['updateSuccess'] = function(response, notification) {
        return {
            type: actionTypes.updateSuccess,
            payload: response,
            notification
        };
    }

    actions['updateFail'] = function(error, notification) {
        return {
            type: actionTypes.updateFail,
            error,
            notification
        };
    }

    actions[`delete`] = function(id) {
        return {
            type: actionTypes.delete,
            payload: {
                id
            }
        };
    }

    actions['deleteSuccess'] = function(payload, notification) {
        return {
            type: actionTypes.deleteSuccess,
            payload,
            notification
        };
    }

    actions['deleteFail'] = function(error, notification) {    
        return {
            type: actionTypes.deleteFail,
            error,
            notification
        };
    }

    actions[`resetCurrent`] = function() {
        return {
            type: actionTypes.resetCurrent
        };
    }

    actions['updateFilter'] = function(key, value) {
        return {
            type: actionTypes.updateFilter,
            payload: {
                key,
                value
            }
        };
    }

    actions['syncFilters'] = function(filters) {
        return {
            type: actionTypes.syncFilters,
            payload: filters
        };
    }

    actions['checkFilterSync'] = function(query) {
        return {
            type: actionTypes.checkFilterSync,
            payload: query
        };
    }

    actions['setFilters'] = function(filters) {
        return {
            type: actionTypes.setFilters,
            payload: filters
        };
    }

    actions['resetFilters'] = function(query) {
        return {
            type: actionTypes.resetFilters
        };
    }

    actions['changePage'] = function(page) {
        return {
            type: actionTypes.changePage,
            payload: {
                page
            }
        };
    }

    actions['changeOrder'] = function(key, direction) {
        return {
            type: actionTypes.changeOrder,
            payload: {
                key,
                direction
            }
        };
    }

    actions['select'] = function(items) {
        return {
            type: actionTypes.select,
            payload: arrify(items)
        };
    }

    actions['deselect'] = function(items) {
        return {
            type: actionTypes.deselect,
            payload: arrify(items)
        };
    }

    actions['selectAll'] = function() {
        return {
            type: actionTypes.selectAll
        };
    }

    actions['deselectAll'] = function() {
        return {
            type: actionTypes.deselectAll
        };
    }

    actions['filterCollection'] = function() {
        return {
            type: actionTypes.filterCollection
        };
    }

    return actions;
}

export default {
    createActions,
    createActionTypes
};
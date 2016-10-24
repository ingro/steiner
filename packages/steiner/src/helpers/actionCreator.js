import arrify from 'arrify';
import upperFirst from 'lodash/upperFirst';
import defaults from 'lodash/defaults';
import forOwn from 'lodash/forOwn';
import trim from 'lodash/trim';
import template from 'lodash/template';

import defaultMessages from '../messages/en';

function addAsyncGroup(resource, actionTypes, group, options) {
    const upperGroup    = group.toUpperCase();

    resource = trim(resource);

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

export function createActionTypes(resource, options = {}) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    if (options.addAlias == null) {
        options.addAlias = true;
    }

    resource = trim(resource);

    if (resource === '') {
        throw new Error('Expected resource');
    }

    const actionTypes = {};

    addAsyncGroup(resource, actionTypes, 'list', options);
    addAsyncGroup(resource, actionTypes, 'fetch', options);
    addAsyncGroup(resource, actionTypes, 'create', options);
    addAsyncGroup(resource, actionTypes, 'update', options);
    addAsyncGroup(resource, actionTypes, 'delete', options);

    const resetCurrent = `${resource}/RESET_CURRENT`;
    const updateFilter = `${resource}/UDATE_FILTER`;
    const syncFilters  = `${resource}/SYNC_FILTERS`;
    const checkSync    = `${resource}/CHECK_SYNC`;
    const changePage   = `${resource}/CHANGE_PAGE`;
    const changeOrder  = `${resource}/CHANGE_ORDER`;
    const select       = `${resource}/SELECT`;
    const deselect     = `${resource}/DESELECT`;
    const selectAll    = `${resource}/SELECT_ALL`;
    const deselectAll  = `${resource}/DESELECT_ALL`;

    actionTypes.resetCurrent = resetCurrent;
    actionTypes[resetCurrent] = resetCurrent;

    actionTypes.updateFilter = updateFilter;
    actionTypes[updateFilter] = updateFilter;

    actionTypes.syncFilters = syncFilters;
    actionTypes[syncFilters] = syncFilters;

    actionTypes.checkSync = checkSync;
    actionTypes[checkSync] = checkSync;

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

    return actionTypes;
}

function generateSuccessNotification(message, title) {
    return {
        title,
        message,
        status: 'success'
    }
}

function generateFailNotification(message, title) {
    return {
        title,
        message,
        status: 'error'
    }
}

export function createDefaultMessages(resource, messageTemplates = {}) {
    const messages = {};

    defaults(messageTemplates, defaultMessages.templates.actionMessages);

    forOwn(messageTemplates, (value, key) => {
        if (typeof value === 'function') {
            messages[key] = value({ resource });
        } else if (typeof value === 'string') {
            const compiled = template(value, {
                interpolate : /\{\{([\s\S]+?)\}\}/g
            });
            messages[key] = compiled({ resource });
        }
    });

    return messages;
}

export function createActionMessages(resource, options = {}) {
    const messages = options.messages || {};

    const defaultMessages = createDefaultMessages(resource, options.messageTemplates);
    defaults(messages, defaultMessages);

    return messages;
}

export function createActions(resource, actionTypes, options = {}) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = trim(upperFirst(resource));

    const messages = createActionMessages(resource, options);
    const titles = options.notificationTitles || defaultMessages.messages.notifications.titles;

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

    actions['createSuccess'] = function(response) {
        return {
            type: actionTypes.createSuccess,
            payload: response,
            notification: generateSuccessNotification(messages.createSuccess, titles.success)
        };
    }

    actions['createFail'] = function(error) {
        return {
            type: actionTypes.createFail,
            error,
            notification: generateFailNotification(messages.createFail, titles.fail)
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

    actions['updateSuccess'] = function(response) {
        return {
            type: actionTypes.updateSuccess,
            payload: response,
            notification: generateSuccessNotification(messages.updateSuccess, titles.success)
        };
    }

    actions['updateFail'] = function(error) {
        return {
            type: actionTypes.updateFail,
            error,
            notification: generateFailNotification(messages.updateFail, titles.fail)
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

    actions['deleteSuccess'] = function(payload) {
        return {
            type: actionTypes.deleteSuccess,
            payload,
            notification: generateSuccessNotification(messages.deleteSuccess, titles.success)
        };
    }

    actions['deleteFail'] = function(error) {
        return {
            type: actionTypes.deleteFail,
            error,
            notification: generateFailNotification(messages.deleteFail, titles.fail)
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

    actions['checkSync'] = function(query) {
        return {
            type: actionTypes.checkSync,
            payload: query
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

    return actions;
}

export default {
    createActions,
    createActionTypes
};
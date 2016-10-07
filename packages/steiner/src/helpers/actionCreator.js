// import snakeCase from 'lodash/snakeCase';
import upperFirst from 'lodash/upperFirst';
import defaults from 'lodash/defaults';
import trim from 'lodash/trim';

function addAsyncGroup(resource, actionTypes, group, config) {
    // const upperResource = snakeCase(resource).toUpperCase();
    const upperGroup    = group.toUpperCase();

    resource = trim(resource);

    // const start        = `${upperResource}_${upperGroup}`;
    // const success      = `${upperResource}_${upperGroup}_SUCCESS`;
    // const fail         = `${upperResource}_${upperGroup}_FAIL`;
    const start        = `${resource}/${upperGroup}`;
    const success      = `${resource}/${upperGroup}_SUCCESS`;
    const fail         = `${resource}/${upperGroup}_FAIL`;
    const startAlias   = group;
    const successAlias = `${group}Success`;
    const failAlias    = `${group}Fail`;

    actionTypes[start]   = start;
    actionTypes[success] = success;
    actionTypes[fail]    = fail;

    if (config.addAlias) {
        actionTypes[startAlias]   = start;
        actionTypes[successAlias] = success;
        actionTypes[failAlias]    = fail;
    }
}

export function createActionTypes(resource, config) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    config = config || {};

    if (config.addAlias == null) {
        config.addAlias = true;
    }

    resource = trim(resource);

    if (resource === '') {
        throw new Error('Expected resource');
    }

    const actionTypes = {};

    addAsyncGroup(resource, actionTypes, 'list', config);
    addAsyncGroup(resource, actionTypes, 'fetch', config);
    addAsyncGroup(resource, actionTypes, 'create', config);
    addAsyncGroup(resource, actionTypes, 'update', config);
    addAsyncGroup(resource, actionTypes, 'delete', config);

    // const upperResource = snakeCase(resource).toUpperCase();

    const resetCurrent = `${resource}/RESET_CURRENT`;
    const changePage   = `${resource}/CHANGE_PAGE`;
    const updateFilter = `${resource}/UDATE_FILTER`;
    const changeOrder  = `${resource}/CHANGE_ORDER`;
    // const inputQuery   = `${upperResource}_INPUT_QUERY`;

    actionTypes.resetCurrent = resetCurrent;
    actionTypes[resetCurrent] = resetCurrent;

    actionTypes.changePage = changePage;
    actionTypes[changePage] = changePage;

    actionTypes.updateFilter = updateFilter;
    actionTypes[updateFilter] = updateFilter;

    actionTypes.changeOrder = changeOrder;
    actionTypes[changeOrder] = changeOrder;

    // actionTypes.inputQuery = inputQuery;
    // actionTypes[inputQuery] = inputQuery;

    return actionTypes;
}

function generateDefaultMessages(resource) {
    return {
        createSuccess: `${resource} created with success!`,
        createFail: `An error occured while creating ${resource}`,
        updateSuccess: `${resource} updated successfully!`,
        updateFail: `An error occured while updating ${resource}`,
        deleteSuccess: `${resource} deleted with success!`,
        deleteFail: `An error occured while deleting ${resource}`
    };
};

function generateSuccessNotification(message, title = 'Hooray!') {
    return {
        title,
        message,
        status: 'success'
    }
}

function generateFailNotification(message, title = 'Oh snap!') {
    return {
        title,
        message,
        status: 'error'
    }
}

export function createActions(resource, actionTypes, messages = {}) {
    if (resource == null) {
        throw new Error('Expected resource');
    }

    resource = trim(upperFirst(resource));

    const defaultMessages = generateDefaultMessages(resource);

    defaults(messages, defaultMessages);

    const actions = {};

    actions[`fetch`] = function(id) {
        return {
            type: actionTypes.fetch,
            payload: {
                id
            }
        };
    }

    actions[`list`] = function(filters) {
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
        }
    }

    actions['createSuccess'] = function(response) {
        return {
            type: actionTypes.createSuccess,
            payload: response,
            notification: generateSuccessNotification(messages.createSuccess)
        }
    }

    actions['createFail'] = function(error) {
        return {
            type: actionTypes.createFail,
            error,
            notification: generateFailNotification(messages.createFail)
        }
    }

    actions[`update`] = function(id, data/*, resolve, reject*/) {
        return {
            type: actionTypes.update,
            payload: {
                id,
                data
                /*resolve,
                reject*/
            }
        }
    }

    actions['updateSuccess'] = function(response) {
        return {
            type: actionTypes.updateSuccess,
            payload: response,
            notification: generateSuccessNotification(messages.updateSuccess)
        }
    }

    actions['updateFail'] = function(error) {
        return {
            type: actionTypes.updateFail,
            error,
            notification: generateFailNotification(messages.updateFail)
        }
    }

    actions[`delete`] = function(id) {
        return {
            type: actionTypes.delete,
            payload: {
                id
            }
        }
    }

    actions['deleteSuccess'] = function(payload) {
        return {
            type: actionTypes.deleteSuccess,
            payload,
            notification: generateSuccessNotification(messages.deleteSuccess)
        }
    }

    actions['deleteFail'] = function(error) {
        return {
            type: actionTypes.deleteFail,
            error,
            notification: generateFailNotification(messages.deleteFail)
        }
    }

    actions[`resetCurrent`] = function() {
        return {
            type: actionTypes.resetCurrent
        };
    }

    // actions[`updateQuery`] = function(q) {
    //     return {
    //         type: actionTypes.inputQuery,
    //         payload: {
    //             q
    //         }
    //     };
    // }

    actions['changePage'] = function(page) {
        return {
            type: actionTypes.changePage,
            payload: {
                page
            }
        }
    }

    actions['changeOrder'] = function(key, direction) {
        return {
            type: actionTypes.changeOrder,
            payload: {
                key,
                direction
            }
        }
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

    return actions;
}

export default {
    createActions,
    createActionTypes
};
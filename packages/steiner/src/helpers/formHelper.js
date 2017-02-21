import { createFormAction } from './reduxFormSaga';
import _ from 'lodash';

const identity = data => data;

const optionsDefaults = {
    idKey: 'id'
};

export function createSubmit(actionTypes, dataTransformer = identity, options = {}) {
    _.defaults(options, optionsDefaults);

    return function submit(data, dispatch) {
        const action = data[options.idKey]
            ? createFormAction(actionTypes.update, [actionTypes.updateSuccess, actionTypes.updateFail])
            : createFormAction(actionTypes.create, [actionTypes.createSuccess, actionTypes.createFail]);

        return action(dataTransformer(data), dispatch);
    }
}

export default {
    createSubmit
};
import { createFormAction } from './reduxFormSaga';

const identity = data => data;

export function createSubmit(actionTypes, dataTransformer = identity) {
    return function submit(data, dispatch) {
        const action = data.id
            ? createFormAction(actionTypes.update, [actionTypes.updateSuccess, actionTypes.updateFail])
            : createFormAction(actionTypes.create, [actionTypes.createSuccess, actionTypes.createFail]);

        return action(dataTransformer(data), dispatch);
    }
}

export default {
    createSubmit
};
import { createFormAction } from 'helpers/reduxFormSaga';

export function createSubmit(actionTypes) {
    return function submit(data, dispatch) {
        const action = data.id
            ? createFormAction(actionTypes.update, [actionTypes.updateSuccess, actionTypes.updateFail])
            : createFormAction(actionTypes.create, [actionTypes.createSuccess, actionTypes.createFail]);

        return action(data, dispatch);
    }
}
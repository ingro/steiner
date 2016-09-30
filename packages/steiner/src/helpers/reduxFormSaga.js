/***************************************************************************************/
/******************* FORKED BY https://github.com/mhssmnn/redux-form-saga **************/
/***************************************************************************************/

import { take, race, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

const identity = i => i;
const PROMISE = '@@redux-form-saga/PROMISE';
// const status = ['REQUEST', 'SUCCESS', 'FAIL'];

function createFormAction (requestType, types, payloadCreator = identity) {
    if (!types || types.length !== 2) {
        throw new Error('Must include two action types: [ SUCCESS, FAIL ]');
    }

    // const actionMethods = {};

    const formAction = (payload) => ({
        type: PROMISE,
        payload
    });

    const requestAction = payload => ({
        type: requestType,
        payload: payloadCreator(payload)
    });

    return function(data, dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(formAction({
                request: requestAction(data),
                defer: { resolve, reject },
                types
            }));
        });
    };

  // Allow a type prefix to be passed in
  // if (typeof requestAction === 'string') {
  //   requestAction = status.map(s => {
  //     let a = s === 'REQUEST' ? requestAction : `${requestAction}_${s}`;
  //     let subAction = payload => ({
  //       type: a,
  //       payload: payloadCreator(payload)
  //     });

  //     // translate specific actionType to generic actionType
  //     actionMethods[s] = a;
  //     actionMethods[s.toLowerCase()] = subAction;

  //     return subAction;
  //   })[0];

  //   if (types) {
  //     payloadCreator = types;
  //   }

  //   types = [ actionMethods.SUCCESS, actionMethods.FAIL ];
  // }

    // return Object.assign((data, dispatch) => {
    //     return new Promise((resolve, reject) => {
    //         dispatch(formAction({
    //             request: requestAction(data),
    //             defer: { resolve, reject },
    //             types
    //         }));
    //     });
    // }, actionMethods);
}

function *formActionSaga () {
    while (true) {
        let action = yield take(PROMISE);
        let { request, defer, types } = action.payload;
        let { resolve, reject } = defer;
        let [ SUCCESS, FAIL ] = types;

        yield put(request);

        const winner = yield race({
            success: take(SUCCESS),
            fail: take(FAIL)
        });

        if (winner.success) {
            yield call(resolve, winner.success);
        } else {
            // console.log(winner.fail);
            // TODO: capire come popolare questo oggetto in base ai diversi tipi di errore
            // yield call(reject, winner.fail);
            yield call(reject, new SubmissionError({ _error: 'Submit failed!', address: 'Too short!' }));
        }
    }
}

export {
    PROMISE,
    createFormAction,
    formActionSaga
}

export default formActionSaga;
export const LOGIN_REQUEST          = 'steiner/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS  = 'steiner/LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAIL     = 'steiner/LOGIN_REQUEST_FAIL';

export const LOGOUT_REQUEST         = 'steiner/LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'steiner/LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAIL    = 'steiner/LOGOUT_REQUEST_FAIL';

export const UPDATE_PROFILE         = 'steiner/UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'steiner/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL    = 'steiner/UPDATE_PROFILE_FAIL';

export function loginRequest(data) {
    return {
        type: LOGIN_REQUEST,
        payload: data
    };
}

export function loginRequestSuccess(response, notification) {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        payload: response,
        notification
    };
}

export function loginRequestFail(error) {
    return { 
        type: LOGIN_REQUEST_FAIL, 
        error
    };
}

export function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    };
}

export function logoutRequestSuccess() {
    return {
        type: LOGOUT_REQUEST_SUCCESS
    };
}

export function logoutRequestFail(error) {
    return {
        type: LOGOUT_REQUEST_FAIL,
        error
    };
}

export function updateProfile(data) {
    return {
        type: UPDATE_PROFILE,
        payload: data
    };
}

export function updateProfileSuccess(data, notification) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
        notification
    };
}

export function updateProfileFail(error, notification) {
    return {
        type: UPDATE_PROFILE_FAIL,
        error,
        notification
    };
}

export const actions = {
    loginRequest,
    loginRequestSuccess,
    loginRequestFail,
    logoutRequest,
    logoutRequestSuccess,
    logoutRequestFail,
    updateProfile,
    updateProfileSuccess,
    updateProfileFail
};

export const actionTypes = {
    login: LOGIN_REQUEST,
    loginSuccess: LOGIN_REQUEST_SUCCESS,
    loginFail: LOGIN_REQUEST_FAIL,
    logout: LOGOUT_REQUEST,
    logoutSuccess: LOGOUT_REQUEST_SUCCESS,
    logoutFail: LOGOUT_REQUEST_FAIL,
    updateProfile: UPDATE_PROFILE,
    updateProfileSuccess: UPDATE_PROFILE_SUCCESS,
    updateProfileFail: UPDATE_PROFILE_FAIL
};
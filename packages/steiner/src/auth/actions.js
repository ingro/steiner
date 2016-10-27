export const LOGIN_REQUEST          = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS  = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAIL     = 'LOGIN_REQUEST_FAIL';

export const LOGOUT_REQUEST         = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAIL    = 'LOGOUT_REQUEST_FAIL';

export const UPDATE_PROFILE         = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL    = 'UPDATE_PROFILE_FAIL';

export function loginRequest(data) {
    return {
        type: LOGIN_REQUEST,
        payload: data
    };
}

export function loginRequestSuccess(response) {
    return {
        type: LOGIN_REQUEST_SUCCESS, 
        payload: response, 
        notification: {
            title: 'Hooray',
            message: 'Authentication successfull!',
            status: 'success'
        }
    }
}

export function loginRequestFail(error) {
    return { 
        type: LOGIN_REQUEST_FAIL, 
        error: error.response && error.response.data ? { message: error.response.data.error } : error 
    }
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
        error: error.response && error.response.data ? { message: error.response.data.error } : error 
    }
}

export function updateProfile(data) {
    return {
        type: UPDATE_PROFILE,
        payload: data
    };
}

export function updateProfileSuccess(data) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
        notification: {
            title: 'Hooray',
            message: 'Profile updated!',
            status: 'success'
        }
    };
}

export function updateProfileFail(error) {
    return {
        type: UPDATE_PROFILE_FAIL,
        error: error.response && error.response.data ? { message: error.response.data.error } : error 
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
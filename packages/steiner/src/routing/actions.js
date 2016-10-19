export const NAVIGATE = 'NAVIGATE';

export function navigate(location, action) {
    return {
        type: NAVIGATE,
        location,
        action
    };
}

export const actions = {
    navigate
};

export const actionTypes = {
    navigate: NAVIGATE
};
export const CHECK_USER_ACTION = 'CHECK_USER_ACTION';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const checkUserSession = () => ({
    type: CHECK_USER_ACTION
});

export const setCurrentUser = (user: any) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
};

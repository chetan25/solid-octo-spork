import { createSelector } from 'reselect';

export const userSelector = createSelector(
    (state: any) => state.user,
    (user) => user.currentUser
);

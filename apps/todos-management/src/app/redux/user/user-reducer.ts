import {
    SET_CURRENT_USER,
} from './user-actions';
import { IUserState } from '../../interfaces/user';

interface IUserAction {
    type: string;
    payload: any;
}

const initialState: IUserState =  {
    currentUser: null,
    signInError: null,
    registrationError: null,
    pageLoading: true,
    signInProgress: false
};

const userReducer = (state: IUserState = initialState, action: IUserAction): IUserState => {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log(action.payload, 'action.payload');
            return {
                registrationError: null,
                signInError: null,
                currentUser: action.payload,
                pageLoading: false,
                signInProgress: false
            };
        default:
            return state;
    }
};

export default userReducer;

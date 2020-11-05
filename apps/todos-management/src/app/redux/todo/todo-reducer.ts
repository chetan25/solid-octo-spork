import { ADD_TODO, FETCH_TODO_SUCCESS, FETCH_TODO } from './todo-actions';
import { ITodosState } from '../../interfaces/user';

const defaultState: ITodosState = {
    todos: [],
    isFetching: false,
    hasError: false
}

export interface IAction {
    type: string;
    payload?: any;
}

const todoReducer = (state: ITodosState = defaultState, action: IAction): ITodosState => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case FETCH_TODO:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_TODO_SUCCESS:
            return {
                todos: action.payload,
                isFetching: false,
                hasError: false
            };
        default:
            return state;
    }
}

export default todoReducer;

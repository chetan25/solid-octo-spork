import {
  ADD_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR
} from './todo-actions';
import { ITodosState } from '../../interfaces/user';

const defaultState: ITodosState = {
    todos: [],
    isFetching: false,
    isProcessing: false,
    hasError: false,
    addSuccess: false,
}

export interface IAction {
    type: string;
    payload?: any;
}

const todoReducer = (state: ITodosState = defaultState, action: IAction): ITodosState => {
    switch (action.type) {
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                hasError: false,
                addSuccess: true
            }
        case ADD_TODO_ERROR:
            return {
              ...state,
              isProcessing: false,
              addSuccess: false,
              hasError: true
            }
        case ADD_TODO:
            return {
              ...state,
              todos: [...state.todos, action.payload],
              hasError: false,
              addSuccess: false,
              isProcessing: true
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

import { ITodo } from '../../interfaces/user';

export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR';
export const FETCH_TODO = 'FETCH_TODO';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_ERROR = 'FETCH_TODO_ERROR';

export const addTodo = (todo: ITodo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const addTodoSuccess = () => {
  return {
    type: ADD_TODO_SUCCESS,
  }
}

export const addTodoError = () => {
  return {
    type: ADD_TODO_ERROR
  }
}


export const fetchTodos = () => {
    return {
        type: FETCH_TODO
    }
}

export const fetchTodoSuccess = (todos: ITodo[]) => {
    return {
        type: FETCH_TODO_SUCCESS,
        payload: todos
    }
}

export const fetchTodoError = () => {
    return {
        type: FETCH_TODO_ERROR
    }
}


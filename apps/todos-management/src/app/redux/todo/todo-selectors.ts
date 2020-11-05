import { createSelector } from 'reselect';
import { IStore, ITodosState, ITodo  } from '../../interfaces/user';

const selectorTodos = (state: IStore): ITodosState  => state.todos;

export const selectTodos = createSelector(
    [selectorTodos],
    (todos: ITodosState): ITodo[] => todos.todos
);

export const selectIsFetching = createSelector(
    [selectorTodos],
    (todos: ITodosState): boolean|undefined => todos.isFetching
);

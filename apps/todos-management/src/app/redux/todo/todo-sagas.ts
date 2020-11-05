import { takeLatest, call, all, put } from 'redux-saga/effects';
import { ADD_TODO, FETCH_TODO, fetchTodoSuccess, fetchTodoError } from './todo-actions';

// export function* addTodoAsync() {
//     try {
//
//     } catch(err) {
//
//     }
// }
//
// export function* addTodo() {
//     yield takeLatest(
//         ADD_TODO,
//         addTodoAsync
//     );
// }

// Dummy function
const getTodos = () => {
   return new Promise( (resolutionFunc) => {
       setTimeout(() => {
           resolutionFunc([]);
       }, 1500)
   });

}

export function* fetchTodosAsync() {
    try {
        const todos = yield call(getTodos);
        yield put(fetchTodoSuccess(todos));
    } catch(err) {
        yield put(fetchTodoError());
    }
}

export function* fetchTodos() {
    yield takeLatest(
        FETCH_TODO,
        fetchTodosAsync
    );
}

export function* todoSaga() {
    yield all([
        call(fetchTodos)
    ]);
}

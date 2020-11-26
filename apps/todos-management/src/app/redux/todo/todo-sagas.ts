import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  ADD_TODO, addTodoSuccess, addTodoError,
  FETCH_TODO, fetchTodoSuccess, fetchTodoError } from './todo-actions';
import { getTodo, addTodo } from '../../graphql-helpers/helper';

export function* fetchTodosAsync() {
    try {
      const { todos } = yield call(getTodo);
      yield put(fetchTodoSuccess(todos));
    } catch(err) {
      console.log(err);
        yield put(fetchTodoError());
    }
}

export function* fetchTodosSaga() {
    yield takeLatest(
        FETCH_TODO,
        fetchTodosAsync
    );
}

function addTodoDummy() {
  setTimeout(() => addTodo({title: 'test', description: 'test'}));
}

export function* addTodoAsync(payload) {
  try {
    console.log(payload, 'payload');
    const { payload: newTodo } = payload;
    const { todo } = yield call(addTodo, newTodo);
    console.log(todo);
    yield put(addTodoSuccess());
  } catch(err) {
    console.log(err);
    yield put(addTodoError());
  }
}

export function* addTodoSaga() {
  yield takeLatest(
    ADD_TODO,
    addTodoAsync
  )
}

export function* todoSaga() {
    yield all([
        call(fetchTodosSaga),
       call(addTodoSaga)
    ]);
}

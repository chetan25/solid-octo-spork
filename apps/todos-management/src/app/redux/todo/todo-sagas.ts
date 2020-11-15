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

export function* addTodoAsync() {
  try {
    const { todo } = yield call(addTodo, {title: 'test', author: 'test'});
    console.log(todo);
    yield put(addTodoError());
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

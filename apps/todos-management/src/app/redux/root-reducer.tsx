import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import todoReducer from './todo/todo-reducer';

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    todos: todoReducer
});

export default persistReducer(persistConfig, rootReducer) ;

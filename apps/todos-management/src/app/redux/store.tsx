import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import rootReducer from "./root-reducer";
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from './root-saga';

// const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
if(process.env.NODE_ENV === 'development') {
    // @ts-ignore
    middlewares.push(logger);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
    store: store,
    persistor: persistor
};

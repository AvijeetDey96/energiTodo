import {createStore,applyMiddleware}  from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import createSagaMiddleware from "redux-saga"; 
import rootSaga from './sagas/index'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)


const sagaMiddleware = createSagaMiddleware();
const middleware =[logger,sagaMiddleware]

// const store = createStore(rootReducer,(applyMiddleware(...middleware)))
const store = createStore(persistedReducer,(applyMiddleware(...middleware)))
sagaMiddleware.run(rootSaga);
export default store;
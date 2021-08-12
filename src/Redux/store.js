import {createStore,applyMiddleware}  from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 

const persistConfig = {
    key: 'root',
    storage, 
  }
   
  // const initialState = { 
  //   categories:[{id:0,name:'default',icon:'TaskTwoTone'}]
  // };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  

 const middleware =[logger]

 const store = createStore(persistedReducer,(applyMiddleware(...middleware)))
 export default store;
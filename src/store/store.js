import { compose, createStore, applyMiddleware} from 'redux';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';      //logger allows us to see what the state looks like before an action is dispatched, what the action is, how the state looks after the action
import thunk from 'redux-thunk';

//middlewares are kind of helper libraries that run before an action hits the reducer, whenever an action is dispatched before that action hits the reducers it hits the middelware
//middlewares enhance our store


import { rootReducer } from './root-reducer';    

const persistConfig = {
    key: 'root',
    storage,          //equivallent to storage: storage
    whitelist: ['cart']    //user state is controlled by google auth, categories is tracked by isLoading, both does not need to be persisted like we want to persist the items in the cart when a user logs out and log in again
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);  //consoles the logger info when it is not in production mode.  

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
     compose;
    
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));    //compose is a functional programming concept w/c is a way to pass multiple functions left to right, spreading multiple middlewares 


export const store = createStore(persistedReducer, undefined, composedEnhancers);    //rootreducer builds the store

export const persistor = persistStore(store)


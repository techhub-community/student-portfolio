import {createStore,compose, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import AppReducer from "../reducers/_appReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// CREATE A LOGGER

const logger = createLogger();
const middlewares = [thunk, logger];

const configureStore = ()=>{
   const store = createStore(
      combineReducers({
         appReducer:AppReducer
      })
      ,
   composeEnhancers(applyMiddleware(...middlewares))
   )
   return store
}

export default configureStore;
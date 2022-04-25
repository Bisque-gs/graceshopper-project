import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleUserReducer from '../redux/singleUser';
import singleProductReducer from '../redux/singleProduct';
import productsReducer from '../redux/products';
import adminUserReducer from '../redux/admin';

const reducer = combineReducers({
  auth,
  products: productsReducer,
  user: singleUserReducer,
  product: singleProductReducer,
  allUsers: adminUserReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';

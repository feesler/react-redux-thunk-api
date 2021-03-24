import { createStore, combineReducers, applyMiddleware } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceFormReducer from '../reducers/serviceForm';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

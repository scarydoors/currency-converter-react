import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'redux/rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));

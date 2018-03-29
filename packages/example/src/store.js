import { createStore, combineReducers } from 'redux';

import nav from './redux/nav';

const rootReducer = combineReducers({ nav });
const store = createStore(rootReducer);

export default store;

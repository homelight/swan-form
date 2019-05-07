import React from 'react';
import { createBrowserHistory } from 'history';
import Loader from './Loader';

const Routes = Loader(() => import(/* webpackChunkName: "routes" */ './routes'), null);
const history = createBrowserHistory();

const App = <Routes history={history} />;

export default App;

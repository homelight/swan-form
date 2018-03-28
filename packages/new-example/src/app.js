import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import Routes from './routes';

const history = createBrowserHistory();

const App = <Routes history={history} />;

export default App;

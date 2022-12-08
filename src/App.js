import './App.less';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyLayout from './components/Layout/MyLayout';
import Dogs from './pages/Dogs/dogsAPI';


const App = () => (
  <Router>
    <Switch>
      {/* <Route exact path="/" component={MyLayout} /> */}
      <Route exact path="/" component={Dogs} />
    </Switch>
  </Router>
);

export default App;

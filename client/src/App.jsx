import React from 'react';
import LeagueSummary from './components/LeagueSummary';
import TeamStats from './components/TeamStats';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LeagueSummary} />
          <Route path="/team/:teamAbbr" component={TeamStats} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

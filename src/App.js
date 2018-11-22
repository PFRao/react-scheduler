import React, { Component } from 'react';
import './App.css';

import ReactSchedulerContainer from './components/calendar/ReactSchedulerContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactSchedulerContainer></ReactSchedulerContainer>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { storeInstance, history } from './Store';
import { GlobalEventDistributor } from './GlobalEventDistributor';

import logo from './logo.svg';
import './App.css';

const globalEventDistributor = new GlobalEventDistributor();
globalEventDistributor.registerStore(storeInstance);

function App() {
  console.log('globalEventDistributor', globalEventDistributor);
  return (
    <Provider store={storeInstance}>
      {/* <BasicLayout {...customProps} /> */}
      <Router history={history}>
        <Switch>
          <Route
            path='auth'
            render={() => {
              return <div>auth</div>;
            }}
          />
          <Route
            path='/'
            render={() => {
              return <div>xxxx</div>;
            }}
          />
        </Switch>
      </Router>
    </Provider>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload. dsfsdf
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

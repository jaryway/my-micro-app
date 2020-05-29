import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalEventDistributorContext from './GlobalEventDistributorContext';
import { storeInstance, history } from './Store';
import { GlobalEventDistributor } from './GlobalEventDistributor';
import SecurityLayout from './layouts/SecurityLayout';

// import Home from './Home';
import LoginPage from './pages/Login';

// import logo from './logo.svg';
import './App.css';
import Home from './Home';

const globalEventDistributor = new GlobalEventDistributor();
globalEventDistributor.registerStore(storeInstance);

function App() {
  console.log('globalEventDistributor', globalEventDistributor);
  return (
    <Provider store={storeInstance}>
      <GlobalEventDistributorContext.Provider value={globalEventDistributor}>
        <Router history={history}>
          <Switch>
            <Route
              path='/login'
              component={LoginPage}
              // render={() => {
              //   return <div>auth</div>;
              // }}
            />
            <Route
              render={(props: any) => {
                console.log('xxxcvasdfas', props);
                return (
                  <SecurityLayout globalEventDistributor={globalEventDistributor}>
                    <Switch>
                      <Route path='/' component={Home} />
                    </Switch>
                  </SecurityLayout>
                );
              }}
            />
          </Switch>
        </Router>
      </GlobalEventDistributorContext.Provider>
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

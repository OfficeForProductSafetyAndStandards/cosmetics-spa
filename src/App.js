import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from './Proposed/Page';

import Header from './Header';
import HomePage from './Pages/HomePage.js';
import CaptureProductInformation from './Pages/CaptureProductInformation.js';

const App = () => {
  return (
    <Page>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/CaptureProductInformation" component={CaptureProductInformation} />
      </Switch>
    </Page>
  );
};

export default App;

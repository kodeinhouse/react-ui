import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import { Demo } from '../src/components/Demo';
import '../styles/import.less';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Demo);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../src/components/Demo', () => {
    render(Demo)
  });
}

import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

import { App } from './demo/App';
import './style.less';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('react-root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./demo/App', () => {
    render(App)
  });
}

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

// AppContainer is a necessary wrapper component for HMR

import { Demo } from '../src/demo/Demo';
import '../styles/themes/core/import.less';
import '../styles/themes/main/import.less';
import '../styles/themes/outline/import.less';
import '../styles/themes/subtheme/demo/import.less';
import '../node_modules/react-layout/styles/required/import.less';
import '../node_modules/react-layout/styles/optional/import.less';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('react-root')
  );
};

render(Demo);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../src/demo/Demo', () => {
    render(Demo)
  });
}

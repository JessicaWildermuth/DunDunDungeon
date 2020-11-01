import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/extensions
import App from './App.jsx';
window.monsterLocation = { top: 0, left: 0};
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

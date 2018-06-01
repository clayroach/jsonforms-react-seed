import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import schemaworks from './schema-works.json';
import uischemaworks from './uischema-works.json';
import schemabroken from './schema-broken.json';
import uischemabroken from './uischema-broken.json';
import { Actions, jsonformsReducer } from '@jsonforms/core';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester'

const works = {
  "firstarray": {
    "objectarrayofstrings": {
      "choices": [
        "CHOICE_STRING_1",
        "CHOICE_STRING_2",
        "CHOICE_STRING_3"
      ]
    }
  }
}

const broken = {
  "firstarray": [
    {
      "objectarrayofstrings": {
        "choices": [
          "CHOICE_STRING_1",
          "CHOICE_STRING_2",
          "CHOICE_STRING_3"
        ]
      }
    }
  ]
}

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      fields: materialFields,
      renderers: materialRenderers
    },
  }
);

store.dispatch(Actions.init(broken, schemabroken, uischemabroken));
//store.dispatch(Actions.init(works, schemaworks, uischemaworks));


// Uncomment this line (and respective import) to register our custom renderer
store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

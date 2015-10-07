'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import createProvider from './provider.js';
import createStore from './store';

// Determine if we have a debug session
let debugSession;
if (__DEV__) {
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	if (matches && matches[1]) {
		debugSession = matches[1];
	}
}

// Load initial state from window
const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const store = createStore(initialState, debugSession);

// Build provider component
const provider = createProvider(store);

// Render to DOM
ReactDOM.render(provider, document.getElementById('root'));

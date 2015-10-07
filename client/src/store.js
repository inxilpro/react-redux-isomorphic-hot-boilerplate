'use strict';

import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise';
import loggerMiddleware from 'redux-logger';
import reducer from './reducer';

export default function(initialState, debugSession) {
	let createStoreWithMiddleware;
	if (__DEV__) {
		// Include redux devtools
		if (debugSession) {
			// And persist state
			createStoreWithMiddleware = compose(
				applyMiddleware(promiseMiddleware, loggerMiddleware()),
				devTools(),
				persistState(debugSession)
			)(createStore);
		} else {
			// Don't persist state
			createStoreWithMiddleware = compose(
				applyMiddleware(promiseMiddleware, loggerMiddleware()),
				devTools()
			)(createStore);
		}
	} else {
		// No devtools or logger
		createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
	}

	const store = createStoreWithMiddleware(reducer, initialState);

	if (__DEV__ && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducer', () => {
			const nextRootReducer = require('./reducer');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

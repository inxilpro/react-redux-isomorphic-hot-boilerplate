'use strict';

import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import App from './containers/App';

export default function(store, props = {}) {
	let devComponents;
	if (__DEV__) {
		devComponents = (
			<DebugPanel top right bottom>
				<DevTools store={store} monitor={LogMonitor} />
			</DebugPanel>
		);
	}

	return (
		<div>
			<Provider store={store}>
				<App {...props} />
			</Provider>
			{devComponents}
		</div>
	);
}

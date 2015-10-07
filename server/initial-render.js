'use strict';

import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import createProvider from '../client/src/provider.js';
import createStore from '../client/src/store.js';
import initialState from '../client/src/initial-state';

const renderHtml = function (preRendered, initialState) {
	const app = require('../package.json');
	return `<!DOCTYPE html>
		<html>
			<head>
				<title>${app.name}</title>
            </head>
        <body>
			<div id="root">${preRendered}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
			</script>
			<script src="/static/bundle.js"></script>
		</body>
		</html>
	`;
};

export default function initialRender(req, res) {
	// Check for debug session variable
	let debugSession;
	if (__DEV__ && req.query.debug_session) {
		debugSession = req.query.debug_session;
	}

	// Render app on server
	const store = createStore(initialState, debugSession);
	const provider = createProvider(store);
	const html = ReactDOMServer.renderToString(provider);
	const state = store.getState();
	res.send(renderHtml(html, state));
}

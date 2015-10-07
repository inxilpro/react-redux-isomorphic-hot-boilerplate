'use strict';

import { handleActions } from 'redux-actions';
import initialState from './initial-state.js';

export default handleActions({
	INCREMENT: (state, action) => {
		return {
			...state,
			count: (state.count + parseInt(action.payload, 10))
		};
	},
	DECREMENT: (state, action) => {
		return {
			...state,
			count: (state.count - parseInt(action.payload, 10))
		};
	},
}, initialState);

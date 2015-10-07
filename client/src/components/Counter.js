'use strict';

import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
	render() {
		return (
			<div>
				<h1>Count: {this.props.count}</h1>
				<div>
					<button onClick={() => this.props.increment(1)}>+1</button>
					<button onClick={() => this.props.increment(10)}>+10</button>
					<button onClick={() => this.props.decrement(1)}>-1</button>
					<button onClick={() => this.props.decrement(10)}>-10</button>
				</div>
			</div>
		);
	}
}

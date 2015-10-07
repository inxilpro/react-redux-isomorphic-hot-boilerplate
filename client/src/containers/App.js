'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Counter from '../components/Counter';

// How should the store be passed to the App
function mapStateToProps(state) {
	return {...state};
}

// How should actions be passed into the App
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

class App extends Component {
	render() {
		// Render app
		return (
			<div>
				<Counter count={this.props.count} increment={this.props.actions.increment} decrement={this.props.actions.decrement} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

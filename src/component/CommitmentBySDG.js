import React, { Component } from 'react';
import Chart from 'chart.js';
import "../stylesheets/commitmentxSDG.scss";


class CommitmentBySDG extends Component {
	constructor(props) {
    super(props);
		this.state = { 
			data: this.props.dataMap
		};
	}
	componentDidMount() {
		this.renderChart(); 
	}

	renderChart() {
		var chartData = [20, 10, 13, 29];
		var ctx = document.getElementById('myChart').getContext('2d');

		var myBarChart = new Chart(ctx, {
			type: 'bar',
			data: chartData,
	});
	}

  render() {
    return (
      <div id="commitmentBySDG">
				<h1> hello</h1>
				<div>
				<canvas id="myChart" width="600" height="400" ></canvas>
				</div>
      </div>
    );
	}
	
}

export default CommitmentBySDG;

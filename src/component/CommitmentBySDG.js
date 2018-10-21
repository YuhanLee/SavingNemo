import React, { Component } from 'react';
import Chart from 'chart.js';
import "../stylesheets/commitmentxSDG.scss";


class CommitmentBySDG extends Component {
	constructor(props) {
    super(props);
	}


	componentDidMount() {
		//hardcoding it before the data can be properly be passed from App.js through dataMap
		var dataX= ["14.1", "14.2", "14.3", "14.4", "14.5", "14.6", "14.7", "14.a", "14.b", "14.c"]; 
		var dataY = ["547", "705", "232", "413", "385", "91", "326", "530", "228", "271"]; 

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataX, 
            datasets: [{
                label: '# of Commitments',
                data: dataY, 
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
						}
				}
    });
	}
	
  render() {
    return (
      <div className="chart-container">
				<h1>Commitment by SDG Target</h1>
        <canvas id="myChart" className="canvas" width="600" height="400"></canvas>
      </div>
    );
	}	
}

export default CommitmentBySDG;

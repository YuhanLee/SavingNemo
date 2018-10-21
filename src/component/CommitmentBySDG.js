import React, { Component } from 'react';
import Chart from 'chart.js';


class CommitmentBySDG extends Component {
	constructor(props) {
    super(props);
		this.state = { 
			data: []
		};
	}

	getData(data) {
		console.log("data", data); 
	}

	componentDidMount() {
		this.setState({data: this.props.dataMap.commitmentBySDG})
		console.log("componentDidMount = ", this.state.data); 
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: this.getData(this.state.data.commitmentBySDG),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
      <div className="chart-container" style={{ postion: 'relative', height: '150vh', width: '150vh' }}>
        <canvas id="myChart"></canvas>
      </div>
    );
	}
	
}

export default CommitmentBySDG;

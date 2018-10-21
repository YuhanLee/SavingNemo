import React, { Component } from 'react';
import Chart from 'chart.js';
import "../stylesheets/commitmentxSDG.scss";


class PartnersByOceanBasin extends Component {
	constructor(props) {
    super(props);
	}


	componentDidMount() {
		var dataX= ["South Pacific", "North Pacific", "North Atlantic", "Arctic Ocean", 
		"Southern Ocean", "South Atlantic", "Indian Ocean", "Global"]; 
		var dataY = ["1204", "904", "1302", "175", "283", "547", "876", "1942"]; 

    var ctx = document.getElementById("partnersByOceanBasins");
    var partnersByOceanBasins = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dataX, 
            datasets: [{
                label: '# of Partners',
                data: dataY, 
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)', 
										'rgba(5,196,20, 1)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(5,196,20, 1)'
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
      <div className="chart-container" >
				<h1>Partners By Ocean Basins</h1>
        <canvas id="partnersByOceanBasins" className="canvas" width="600" height="400" ></canvas>
      </div>
    );
	}	
}

export default PartnersByOceanBasin;

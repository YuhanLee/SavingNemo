import React, { Component } from "react";
import "./App.css";
import WorldMap from "./component/WorldMap";
import CommitmentBySDG from "./component/CommitmentBySDG";
import PartnersByOceanBasin from './component/PartnersByOceanBasin'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			dataMap: {}
		};
  }

  componentWillMount() {
			this.setState({ dataMap: window.mainMap, map2: window.otherMap, loaded: true });
			this.sleep(1000).then(() => {		});
	}
	
	 sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	
  render() {
	  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Saving Nemo 🌊</h1>
        </header>

        <section className="container world-map">
          <h1>World Map</h1>
          <div className="container">
						<WorldMap />
          </div>
        </section>

        <section className="container bar-chart">
          <div className="container grid-container">
						<div className="grid-item">
							<CommitmentBySDG dataMap={this.state.dataMap}  />
						</div>

						<div className="grid-item">
								<PartnersByOceanBasin></PartnersByOceanBasin>
						</div>
          </div>
        </section>

        {/* <section className="container doughnut-chart">
          <div className="container">
							<PartnersByOceanBasin> </PartnersByOceanBasin>
						</div>
        </section> */}
      </div>
    );
  }
}

export default App;

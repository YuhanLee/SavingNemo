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
<<<<<<< HEAD



=======
	
>>>>>>> 6dfe8a400fa6516293d607427800ffc4042dd09c
  render() {

    return (
      <div className="App">
        <header className="App-header">
					{/* <h1>Saving Nemo</h1> */}
					<img src="./images/Icon.png" width="100px" height="80px"></img>
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
						</div>
					</section> */}
      </div>
    );
  }
}

export default App;

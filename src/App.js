import React, { Component } from "react";
import "./App.css";
import BarChartExample from "./component/BarChartExample";
import WorldMap from "./component/WorldMap";
import CommitmentBySDG from "./component/CommitmentBySDG";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			dataMap: {}
		};
  }

  componentWillMount() {
    this.setState({ dataMap: window.mainMap, map2: window.otherMap, loaded: true });
  }
  render() {
	
    return (
      <div className="App">
        <header className="App-header">
          <ul id="countries" />
        </header>

        <section className="container world-map">
          <h1>World Map</h1>
          <div>
						<WorldMap />
          </div>
        </section>

        <section className="container bar-chart">
          <h1>Bar Chart</h1>
          <div>
						<BarChartExample />
          </div>
        </section>

        <section className="container section3">
          <h1>Last Section</h1>
						<div>
							<CommitmentBySDG dataMap={this.state.dataMap}/>
						</div>
        </section>
      </div>
    );
  }
}

export default App;

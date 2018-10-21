import React, { Component } from "react";
import "./App.css";
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
			this.sleep(1000).then(() => {		});
	}
	
	 sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
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
          <div>
						{/* {
							console.log("At AppJS = ", this.state.dataMap)
						} */}
						<CommitmentBySDG dataMap={this.state.dataMap}  />
          </div>
        </section>

        <section className="container section3">
          <h1>Last Section</h1>
						<div>
							{/* <CommitmentBySDG dataMap={this.state.dataMap}/> */}
						</div>
        </section>
      </div>
    );
  }
}

export default App;

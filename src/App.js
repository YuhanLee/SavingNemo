import React, { Component } from "react";
import "./App.css";
import WorldMap from "./component/WorldMap";
import CommitmentBySDG from "./component/CommitmentBySDG";
import PartnersByOceanBasin from "./component/PartnersByOceanBasin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMap: {}
    };
  }

  componentWillMount() {
    this.setState({
      dataMap: window.mainMap,
      map2: window.otherMap,
      loaded: true
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Main-subtitle">
          <h2>
            Fact: We could see <br />
            fishless oceans <br /> by 2048
          </h2>
          <h3> Source: National Geographic</h3>
        </div>

        <header className="App-header">
          <img
            src={require("./images/Icon.png")}
            width="250px"
            height="200px"
            style={{ transform: "translateY(0px)" }}
            //  transform="translateY(200px)"
            alt="icon"
          />
          <h1 className="Main-Title"> Saving Nemo</h1>
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
              <CommitmentBySDG dataMap={this.state.dataMap} />
            </div>

            <div className="grid-item">
              <PartnersByOceanBasin />
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

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Section1 from "./component/Section1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {}
    };
  }

  componentDidMount() {
    this.setState({ map: window.mainMap });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul id="countries" />
        </header>

        <section className="section1">
          <h1>section 1</h1>
          <div>
            {console.log(this.state.map)}
            <Section1 />
          </div>
        </section>

        <section className="section2">
          <h1>section 2</h1>
          <div>
            <Section1 />
          </div>
        </section>

        <section className="section3">
          <h1>section 2</h1>
          <div>
            <Section1 />
          </div>
        </section>
      </div>
    );
  }
}

export default App;

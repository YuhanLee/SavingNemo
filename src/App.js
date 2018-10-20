import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Section1 from './component/Section1'; 


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
					{/* <div id="earth"></div> */}
          <p>
            
          </p>
        </header>

				<section class="section1">
					<h1>section 1</h1>
					<div>
						<Section1>	

						</Section1>
					</div>
				</section>

				<section class="section2">
					<h1>section 2</h1>
						<div>
							<Section1>	

							</Section1>
						</div>
				</section>

				<section class="section3">
					<h1>section 2</h1>
						<div>
							<Section1>	

							</Section1>
						</div>
				</section>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from '../logo.svg';
import Scene from '../Scene'
import Controls from '../Controls'
import './Viewer.css';

class Viewer extends Component {
   constructor(props) {
       super(props)
       this.state = {
           finish: 'dark',
           width: 20,
           height: 20,
           mat: 0
       }
       this.changeProp = this.changeProp.bind(this)
       this.colors = [
           [16/360, 0.38, 0.31],
           [37/360, 1, 0.92],
           [30/360, 0.59, 0.53],
           [25/360, 0.76, 0.31],
           [0, 0.56, 0.40],
           [0, 0, 0.75]
       ]
   }

   changeProp( prop ) {
       return (e) => {
           this.setState(Object.assign({}, this.state, {[prop]: [e.target.value]}))
       }
   }

  render() {
    return (
      <div className="Viewer">
        <Scene height={this.state.height} color={this.colors[this.state.mat]} width={this.state.width} />
          <div class="controls">
              <label class="">
                  Width
                  <input type={"range"} min={1} value={this.state.width} onChange={this.changeProp('width')} />
              </label>
              <label>
                  Height
                  <input type={"range"} min={1}  value={this.state.height} onChange={this.changeProp('height')} />
              </label>
              <label>
                  Finish Color
                  <input type={"range"} min={0} steps={1} max={5}  value={this.state.mat} onChange={this.changeProp('mat')} />
              </label>

          </div>
      </div>
    );
  }
}

export default Viewer;

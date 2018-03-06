import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

import LineChart from './linechart';

const styles = {
  textAlign: 'center'
}


export default class Visualize extends Component {

   render() {
      return <div>
        <h3 style={styles}>Internet Committee</h3>
          <div className="bottom-right-svg">
              <LineChart />
          </div>
      </div>
   }
  }
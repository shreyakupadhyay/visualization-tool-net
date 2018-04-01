import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class LinearLoading extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(0), 1000);  // progress function is called after 1 second
  }

  componentWillUnmount() {
    clearTimeout(this.timer);  
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = 50;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <LinearProgress mode="determinate" value={this.state.completed} color='#38BEA0'/>
    );
  }
}
export default LinearLoading;
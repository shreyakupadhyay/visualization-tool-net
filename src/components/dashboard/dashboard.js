import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryZoomContainer, VictoryBrushContainer,
  VictoryBar, VictoryArea } from 'victory';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';

import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  stylePage: {
    width: '1000px',
    margin: '0 auto',
  },
  setMargin: {
    width: '50%',
    height: '50%',
    margin: '0 auto'
  },
  styleButtons: {
    width: '550px',
    margin: '0 auto'
  },
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'rgb(0, 188, 212)',
  },
}


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      zoomAxis: 'x',
      time: 0
    }
    this.handleDataFilter = this.handleDataFilter.bind(this);
    this.handleMovingAverage = this.handleMovingAverage.bind(this);
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleDataFilter(data, time) {
    if(time===0){
      return data;
    }
    else if(data.length > 0){
      let d =  new Date(data[0].x);
      d.setMinutes(d.getMinutes() + time);
      return data.filter((item) => item.x <= d)
    }
  }

  handleMovingAverage(data){
    let movingAverage = []
    for (var i = 1; i < data.length-1; i++)
        {
            var meanX = (data[i].y + data[i-1].y + data[i+1].y)/3.0;
            var dict = {"y":meanX, "x": data[i].x}
            movingAverage.push(dict);
        }
    console.log(movingAverage)
    return movingAverage
  }

  componentDidMount(){
    // console.log(this.props.match.params.id); // this gives the page id
    this.props.fetchData('/april_17_shreyak_local.json'); // pass the id here.
  }

  render() {

    const { error, loading, data } = this.props;

    if(error) return <div>Error { error.message }</div>

    if(loading) return <div>Loading...</div>

    var dataValue = this.state.time==-1 ? this.handleMovingAverage(this.props.data) : this.handleDataFilter(this.props.data,this.state.time);

    return (
      <div>
          <div style={styles.styleButtons}>
            <FlatButton label="10 Min." primary={true} onClick={() => this.setState({time: 10})}/>
            <FlatButton label="15 Min." primary={true} onClick={() => this.setState({time: 15})}/>
            <FlatButton label="30 Min." primary={true} onClick={() => this.setState({time: 30})}/>
            <FlatButton label="Moving Average" primary={true} onClick={() => this.setState({time: -1})}/>
            <FlatButton label="Default" primary={true} onClick={() => this.setState({time: 0})}/>
            <Toggle
              label={this.state.zoomAxis + " axis zoom"}
              labelPosition="right"
              style={styles.toggle}
              onToggle={()=>{
                if(this.state.zoomAxis==="x")
                    this.setState({zoomAxis: "y"});
                else {
                  this.setState({zoomAxis: "x"});
                }
              }}
            />
          </div>
          <div style={styles.setMargin}>
          <VictoryChart width={600} height={350} scale={{x: "time"}}
            containerComponent={
              <VictoryZoomContainer responsive={true}
                zoomDimension={this.state.zoomAxis}
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={dataValue}
            />

          </VictoryChart>
      </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dashboard.items,
  loading: state.dashboard.loading,
  error: state.dashboard.error
})

const matchDispatchToProps = dispatch => {
  return {
    fetchData: (url) => dispatch(fetchData(url))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
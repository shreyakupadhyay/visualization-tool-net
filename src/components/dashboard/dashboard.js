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
      data: props.data
    }
    this.handleDataFilter = this.handleDataFilter.bind(this);
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


  componentDidMount(){
    // console.log(this.props.match.params.id); // this gives the page id
    this.props.fetchData('/chartdata9.json'); // pass the id here.
  }

  render() {

    const { error, loading, data } = this.props;

    if(error) return <div>Error { error.message }</div>

    if(loading) return <div>Loading...</div>

    return (
      <div>
          <div style={styles.styleButtons}>
            <FlatButton label="10 Min." primary={true} onClick={this.handleDataFilter(data,10)}/>
            <FlatButton label="15 Min." primary={true} onClick={this.handleDataFilter(data,15)}/>
            <FlatButton label="30 Min." primary={true} onClick={this.handleDataFilter(data,30)}/>
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
              data={this.handleDataFilter(this.props.data,0)}
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
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';
import { Line } from 'react-chartjs-2';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  stylePage: {
    width: '1000px',
    margin: '0 auto',
  },
  setMargin: {
    width: '70%',
    height: '70%',
    margin: '0 auto'
  },
  styleButtons: {
    width: '550px',
    margin: '0 auto'
  }
}

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      num: 0
    }
  }

  componentDidMount(){
    // console.log(this.props.match.params.id); // this gives the page id
    this.props.fetchData('/chartdata7.json'); // pass the id here.
  }

  render() {

    const { error, loading, data } = this.props;

    if(error) return <div>Error { error.message }</div>

    if(loading) return <div>Loading...</div>

    const dataValue = {
      labels: data.yValue,
      datasets: [
        {
          label: 'Ping data',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#38BEA0',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.xValue,
          devicePixelRatio: 10,
        }
      ]
    };

    return (
      <div style={styles.setMargin}>
      <div style={styles.styleButtons}>
            <FlatButton label="10 Min." primary={true}/>
            <FlatButton label="15 Min." primary={true} />
            <FlatButton label="30 Min." primary={true} />
      </div>
      <Line 
          data={dataValue} 
          options={{
            title: {
              display: true,
              text: 'Visualize Ping Data',
              fontSize: 25
            },
            legend:{
              display: true,
              position: 'bottom'
            }
          }}    
      />
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
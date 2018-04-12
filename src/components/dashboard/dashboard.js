import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';
import { Line } from 'react-chartjs-2';

const styles = {
    height: '50%',
    width: '50%',
    margin: '0 auto',
}

const stylesPage = {
    width: '800px',
    margin: '0 auto',
}

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
       
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    this.props.fetchData('/chartdata.json'); // pass the id here.
  }

  render() {

    const { error, loading, data } = this.props;

    if(error) return <div>Error { error.message }</div>

    if(loading) return <div>Loading...</div>

    const dataValue = {
      labels: data.labels,
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
          data: data.dataValue
        }
      ]
    };


    return (
      <div style={stylesPage}>
      <h2>Visualize Ping Data</h2>
      <Line data={dataValue} />
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
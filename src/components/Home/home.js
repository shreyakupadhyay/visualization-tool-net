import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { fetchUserData } from '../../actions/homeActions';


const styles = {
  width: '1000px',
  margin: '0 auto',
};

class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
              fixedHeader: true,
              fixedFooter: true,
              stripedRows: false,
              showRowHover: false,
              selectable: true,
              multiSelectable: false,
              enableSelectAll: false,
              deselectOnClickaway: true,
              showCheckboxes: true,
              height: '300px',
              valueSingle: '2',
      }
    }

    componentDidMount = () => {
      this.props.fetchUserData('/userdata.json');
    }

    handleChangeSingle = (event, value) => {
      this.setState({
        valueSingle: value,
      });
    };

    handleChangeMultiple = (event, value) => {
      this.setState({
        valueMultiple: value,
      });
    };

    handleOpenMenu = () => {
      this.setState({
        openMenu: true,
      });
    }

    handleOnRequestChange = (value) => {
      this.setState({
        openMenu: value,
      });
    }

    handleToggle = (event, toggled) => {
      this.setState({
        [event.target.name]: toggled,
      });
    };

    handleChange = (event) => {
      this.setState({height: event.target.value});
    };

    render() {
      const { error, loading, userdata } = this.props;

      if(error) return <div>Error { error.message }</div>

      if(loading) return <div>Loading...</div>

      return (
        <div style={styles}>
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn>Name</TableRowColumn>
                <TableRowColumn>Status</TableRowColumn>
                <TableRowColumn>Visualize</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {userdata.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.status}</TableRowColumn>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      onChange={this.handleChangeSingle}
                      value={this.state.valueSingle}
                    >
                      <MenuItem value="1" primaryText="Remove" />
                      <MenuItem value="2" primaryText="Visualize User Data" />
                    </IconMenu>
                </TableRow>
                ))}  

            </TableBody>
          </Table>
        </div>
      )}
    }

function mapStateToProps(state){
    return {
      userdata: state.home.items,
      loading: state.home.loading,
      error: state.home.error
    }
}

const matchDispatchToProps = dispatch => {
  return {
    fetchUserData: (url) => dispatch(fetchUserData(url))
  }
}


// export default Home;
export default connect(mapStateToProps, matchDispatchToProps)(Home)
import { connect } from 'react-redux';
import React, { Component } from 'react';


class User extends Component {
    render() {
      return (
        <div className="user">
        </div>
      );
    }
  }



function mapStateToProps(state){
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, null)(User)
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../actions/authActions';

class NavigationBar extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout (evt) {
    evt.preventDefault();
    this.props.logout();
  }

  render () {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={ this.logout }>Log Out</a> </li>
      </ul>
    );

    const guestLinks  = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <section className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Red Tomato</Link>
          </div>
          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </section>
      </nav>
    );
  }

}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
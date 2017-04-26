import React, { Component } from 'react';
import LogInForm from './LogInForm';

class LogInPage extends Component {

  render() {
    return (
      <section className="row">
        <div className="col-md-4 col-md-offset-4">
          <LogInForm />
        </div>
      </section>
    )
  }

}

export default LogInPage;
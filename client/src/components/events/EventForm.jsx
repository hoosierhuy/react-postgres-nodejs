import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import { createEvent } from '../../actions/eventActions';

class EventForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  onSubmit (evt) {
    evt.preventDefault();
    this.props.createEvent(this.state);
  }

  render () {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={ this.onSubmit }>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={ title }
          onChange={ this.onChange }
          error={ errors.title }
        />

        <button
          type="submit"
          disabled={ isLoading }
          className="btn btn-primary"
        >
          Create
        </button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: React.PropTypes.func.isRequired,
};

export default connect(null, { createEvent })(EventForm);
import React, { Component } from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map'; // TODO: replace with pure JS
import classnames from 'classnames';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import TextFieldGroup from './common/TextFieldGroup';

// Server side validation, also used on the client side
function validateInput(data) {
  let errors = {};

  if ( Validator.isNull(data.username) ) {
    errors.username = 'This field is required';
  }

  if ( Validator.isNull(data.email) ) {
    errors.email = 'This field is required';
  }

  if ( !Validator.isEmail(data.email) ) {
    errors.email = 'Email is invalid';
  }

  if ( Validator.isNull(data.password) ) {
    errors.password = 'This field is required';
  }

  if ( Validator.isNull(data.passwordConfirmation) ) {
    errors.passwordConfirmation = 'This field is required';
  }

  if ( !Validator.equals(data.password, data.passwordConfirmation) ) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  if ( Validator.isNull(data.timezone) ) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default class SignUpForm extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      inValid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  isValid () {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists (evt) {
    // If users sign up with existing user name and email, I will tell them in the browser
    const field = evt.target.name;
    const val = evt.target.value;

    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;

        if (res.data.user) {
          errors[field] = `${field} "${val}" already in use`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        // Disable the 'Sign Up' submit button validation fails
        this.setState({ errors, invalid, })
      });
    }
  }

  onSubmit (evt) {
    evt.preventDefault();

    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true,
      });
      this.props.userSignUpRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have successfully signed up.  Welcome!',
          });
          this.context.router.push('/');
        },
        ({ err }) => this.setState({ errors: err.response.data, isLoading: false, })
      );
    }

  }

  render () {

    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={ val } value={ val }>{ key }</option>
    );

    return (
      <form onSubmit={ this.onSubmit }>
        <h1>Join my community</h1>
        
        <TextFieldGroup
          error={ errors.username }
          field="username"
          value={ this.state.username }
          label="User Name"
          onChange={ this.onChange }
          checkUserExists={ this.checkUserExists }
        />

        <TextFieldGroup
          error={ errors.email }
          field="email"
          value={ this.state.email }
          label="Email"
          onChange={ this.onChange }
          checkUserExists={ this.checkUserExists }
        />

        <TextFieldGroup
          error={ errors.password }
          field="password"
          type="password"
          value={ this.state.password }
          label="Password"
          onChange={ this.onChange }
        />

        <TextFieldGroup
          error={ errors.passwordConfirmation }
          field="passwordConfirmation"
          type="password"
          value={ this.state.passwordConfirmation }
          label="Confirm Password"
          onChange={ this.onChange }
        />

        <section className={classnames("form-group", { 'has-error': errors.timezone })}>
          <label className="control-label">Time Zone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={ this.onChange }
            value={ this.state.timezone }
          >
            <option value="" disabled>Choose Your Time Zone</option>
            {options}
          </select>
          { errors.timezone && <span className="help-block">{ errors.timezone }</span> }
        </section>

        <section className="form-group">
          <button disabled={ this.state.isLoading || this.state.invalid } className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </section>
      </form>
    );
  }

}

SignUpForm.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
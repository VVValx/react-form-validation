import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./utils/Input";

class RegisterForm extends Component {
  state = {
    data: {
      username: "",
      password: "",
      email: ""
    },
    error: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  onChange = ({ target: input }) => {
    const error = {};
    const errorMessage = this.validateInput(input);
    const data = { ...this.state.data };

    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    data[input.name] = input.value;
    this.setState({ data, error });
  };

  onSubmit = e => {
    e.preventDefault();
    const error = this.validateForm();
    this.setState({ error });
  };

  register = () => {
    console.log("Account created successfully");
  };

  render() {
    const { data, error } = this.state;
    return (
      <form onSubmit={this.onSubmit} method="post" action="">
        <div className="form-container">
          <header className="form-header">
            <h1>Create Account</h1>
          </header>

          <Input
            type="text"
            name="username"
            value={data.username}
            onChange={this.onChange}
            placeholder="username"
            error={error}
          />

          <Input
            type="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            placeholder="password"
            error={error}
          />

          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
            placeholder="email"
            error={error}
          />

          <div className="form-input">
            <button
              className="cursor-pointer"
              name="create_acct"
              disabled={this.validateForm()}
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterForm;

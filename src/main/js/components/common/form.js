import React, { Component } from "react";
import Joi from "joi-browser";
import { isBlank } from "../../utils/util";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details)
      _.set(errors, item.path, item.message);
    return errors;
  };

  validateProperty = (propPath, value) => {
    const schema = _.get(this.schema, propPath);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (propPath, event) => {
    const data = _.cloneDeep(this.state.data);
    const { currentTarget: input } = event;
    let value = input.value;
    if (!isBlank(value)) _.set(data, propPath, value);
    else {
      _.unset(data, propPath);
      value = undefined;
    }

    const errors = _.cloneDeep(this.state.errors);
    const errorMessage = this.validateProperty(propPath, value);
    if (errorMessage) _.set(errors, propPath, errorMessage);
    else _.unset(errors, propPath);

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput(name, label, rest = {}) {
    const { data, errors } = this.state;
    const error = _.get(errors, name);
    return (
      <div className="form-group m-1">
        <label htmlFor={name}>{label}</label>
        <input
          className="form-control"
          id={name}
          name={name}
          type = "text"
          value={_.get(data, name) || ""}
          onChange={e => this.handleChange(name, e)}
          {...rest}  />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }

  renderSubmit(name, label, isLoading, rest = {}) {
    return (
      <button
        id={name}
        name={name}
      	disabled={this.validate() || isLoading}
      	type="submit"
        {...rest}
        className="btn btn-primary m-1"
      >
        {isLoading && (
          <React.Fragment>
            <span
              className="spinner-border"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Loading...</span>
          </React.Fragment>
        )}
        {!isLoading && label}
      </button>
    );
  }

}

export default Form;

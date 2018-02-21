import React, { Component } from "react";
import axios from "axios"

class AddClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: '',
      handles: '',
      cohort: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClass = this.addClass.bind(this);
  }

  addClass(){
    console.log("Firing the Missile")
    axios.post('http://localhost:3000/api/addclass', {
    ...this.state
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addClass();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Names:
          <textarea
            name="names"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          GH handles:
          <textarea
            name="handles"
            value={this.state.handles}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Cohort:
          <input
            name="cohort"
            type="input"
            value={this.state.cohort}
            onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default AddClass;

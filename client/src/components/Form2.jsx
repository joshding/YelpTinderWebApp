import React, {useState, useEffect} from 'react';

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    alert('submitted successfully!')
  }
  handleInputChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Form Practice
        <input
          value={this.state.value}
          onChange={this.handleInputChange}
         />
      </label>
      <input type="submit" value="Submit"/>
    </form>
    )
  }
}

export default Form2;
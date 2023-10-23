import React, { Component } from 'react';

class CreateStudent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        surname: '',
        email: '',
        age: 1
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
  
    async handleSubmit(event) {
        const newStudent = { ...this.state };
        const response = await fetch("http://localhost:5001/students/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          });

        event.preventDefault();
        this.setState({
            name: '',
            surname: '',
            email: '',
            age: 1
        });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            surname:
            <input name="surname" type="text" value={this.state.surname} onChange={this.handleChange} />
          </label>
          <label>
            email:
            <input name="email"type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            age:
            <input name="age" type="number" value={this.state.age} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default CreateStudent;
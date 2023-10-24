import React, { Component } from 'react';
import './create_student.css';

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
      this.sendDataToBackend = this.sendDataToBackend.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
  
    async sendDataToBackend(event) {
        const newStudent = { ...this.state };
        const response = await fetch("https://mern-stack-test-backend-gg98.onrender.com/students/add", {
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
        <form onSubmit={this.sendDataToBackend}>
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
          <input type="submit" value="Send data to backend (/students/add endpoint)" />
        </form>
      );
    }
  }

export default CreateStudent;
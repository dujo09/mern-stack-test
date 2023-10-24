import React, { Component } from 'react';
import './student_list.css';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };

        this.getStudentDataFromBackend = this.getStudentDataFromBackend.bind(this);
        this.clearStudentDataFromFrontend = this.clearStudentDataFromFrontend.bind(this)
    }
    
    async getStudentDataFromBackend() {
        const response = await fetch("https://mern-stack-test-backend-gg98.onrender.com/students", {
            method: "GET"
        });

        const students = await response.json();
        this.setState({students: students});
    }

    clearStudentDataFromFrontend() {
        this.setState({ students: []});
    }
    
    getStudentsContent() {
        let content = [];
        for (let i = 0; i < this.state.students.length; i++) {
          const student = this.state.students[i];

          content.push(
            <div className='student_data'>
                <h1>{ student.name } { student.surname }</h1>
                <ul>
                    <li>email: {student.email}</li>
                    <li>age: {student.age}</li>
                </ul>
            </div>
          );
        }
        return content;
      };

    render() {
        return [
            <div className='student_list'>
                {this.getStudentsContent()}

                <button onClick={this.getStudentDataFromBackend}>Send GET request to backend (/students endpoint)</button>
                <button onClick={this.clearStudentDataFromFrontend}>Clear state</button>
            </div>
        ];
      }
}

export default StudentList;
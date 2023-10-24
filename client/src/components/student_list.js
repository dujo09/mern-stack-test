import React, { Component } from 'react';
import './student_list.css';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };

        this.getStudentDataFromBackend = this.getStudentDataFromBackend.bind(this)
    }
    
    async getStudentDataFromBackend() {
        const response = await fetch("https://mern-stack-test-backend-gg98.onrender.com/students", {
            method: "GET"
        });

        const students = await response.json();
        console.log("Students: ${ students }");

        this.setState({students: students});
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

                <button onClick={this.getStudentDataFromBackend}>Fetch student data</button>
                <button onClick={this.setState({ students: []})}>Clear student data (from frontend)</button>
            </div>
        ];
      }
}

export default StudentList;
import React, { Component } from 'react';
import './student_list.css';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };
    }
    
    async callAPI() {
        const response = await fetch("http://localhost:5001/students", {
            method: "GET"
        });

        const studentsJSON = await response.json();
        this.setState({students: studentsJSON});

        // fetch("http://localhost:5001/students")
        //     .then(res => res.text())
        //     .then(res => this.setState({ apiResponse: res }));
    }
    
    componentWillMount() {
        this.callAPI();
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
            </div>
        ];
      }
}

export default StudentList;
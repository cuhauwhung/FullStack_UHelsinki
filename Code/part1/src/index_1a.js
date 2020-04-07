import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course.js'

const PrintCourse = (course) => {

  var courseName = course.course.name;
  var exercises = course.course.exercises;
  const listItems = exercises.map((exe) => <li>{exe}</li>)

  return (
    <div>
      <p>
        Welcome to {courseName}
        <ul>{listItems}</ul>
      </p>
    </div>
  )
}

const App = () => {

  const myCourse = new Course('Half Stack application development');
  myCourse.add_exercise('Fundamentals of React', 10);
  myCourse.add_exercise('Using props to pass data', 7);
  myCourse.add_exercise('State of a component', 14);

  return (
    <div>
      <PrintCourse course={myCourse} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
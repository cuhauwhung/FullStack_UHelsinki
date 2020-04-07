import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ name }) => {
  return (<h1>{name}</h1>)
}

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Course = ({ course }) => {

  const { name, parts } = course;
  
  const total = parts.map(x => x.exercises).reduce((s, p) => {return s + p}, 0)
  // const total = parts.reduce(function(s, p) { return s + p.exercises}, 0)

  const parts_print = parts.map(part => <Part key={part.id} part={part} />)

  return (
    <div>
      <Header name={name} />
      {parts_print}
      Total: {total}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const course_1 = courses[0]
  const course_2 = courses[1] 

  return (
    <div>
      <Course course={course_1} />
      <Course course={course_2} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
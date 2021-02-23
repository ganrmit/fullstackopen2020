import React from 'react';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>    
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
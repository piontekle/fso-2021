import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
);

const Content = (props) => {
  const renderContent = (part) => (
    <Part name={part.name} exercises={part.exercises} />
  );

  return props.content.map(renderContent);
};

const Total = (props) => {
  const sumExercises = (exr) => {
    return exr.reduce((sum, add) => sum + add.exercises, 0);
  }

  return (
    <p>Number of exercises {sumExercises(props.exercises)}</p>
  )
};


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        content={course.parts}
      />
      <Total exercises={course.parts} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))

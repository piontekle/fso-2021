import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.num}</p>
);

const Content = (props) => {
  const renderContent = (part) => (
    <Part name={part.name} num={part.num} />
  );

  return props.content.map(renderContent);
};

const Total = (props) => {
  const sumExercises = (exr) => {
    return exr.reduce((sum, add) => sum + add);
  }

  return (
    <p>Number of exercises {sumExercises(props.exercises)}</p>
  )
};


const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        content={[
          {name: part1, num: exercises1},
          {name: part2, num: exercises2},
          {name: part3, num: exercises3},
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))

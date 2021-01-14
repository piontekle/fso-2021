import React from 'react';

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
);

const Content = ({ content }) => {
  const renderContent = (part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  );

  return content.map(renderContent);
};

const Total = ({ exercises }) => {
  const sumExercises = (exr) => {
    return exr.reduce((sum, add) => sum + add.exercises, 0);
  }

  return (
    <b>Number of exercises {sumExercises(exercises)}</b>
  )
};

const Course = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content
        content={course.parts}
      />
      <Total exercises={course.parts} />
    </div>
  ))
}

export default Course;

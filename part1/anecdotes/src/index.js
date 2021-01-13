import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ heading, anecdote }) => (
  <>
    <h1>{heading}</h1>
    <div>{anecdote.note}</div>
    <div>has {anecdote.points} votes</div>
  </>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [advice, setAdvice] = useState(anecdotes);
  const [highest, setHighest] = useState(0);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleClickNext = () => {
    const select = getRandom(0, advice.length);

    setSelected(select);
  }

  const handleClickVote = () => {
    const currPoints = advice[selected].points + 1;
    const newPoints = { ...advice[selected], points: currPoints }
    let newAdvice = advice;
    newAdvice[selected] = newPoints;

    setAdvice([...newAdvice]);

    setHighest(findHighest(newAdvice));
  }

  const findHighest = (advice) => {
    let highestIdx = highest;
    let currMax = advice[highest].points;
    for (let i = 0; i < advice.length; i++) {
      if (advice[i].points > currMax) {
        currMax = advice[i].points;
        highestIdx = i;
      }
    }

    return highestIdx;
  }

  return (
    <div>
      <Display heading="Anecdote of the day" anecdote={advice[selected]} />
      <Button handleClick={handleClickVote} text="Vote" />
      <Button handleClick={handleClickNext} text="Next Anecdote" />
      <Display heading="Anecdote with most votes" anecdote={advice[highest]} />
    </div>
  )
}

const anecdotes = [
  { note: 'If it hurts, do it more often', points: 0},
  { note: 'Adding manpower to a late software project makes it later!', points: 0 },
  { note: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', points: 0 },
  { note: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', points: 0 },
  { note: 'Premature optimization is the root of all evil.', points: 0 },
  { note: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', points: 0 },
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, rating }) => (
  <button onClick={() => handleClick(rating)}>{rating}</button>
)

const Display = ({ rating, value }) => <div>{rating} {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (rating, value) => {
    if (rating === "good") setGood(good + 1);
    else if (rating === "neutral") setNeutral(neutral + 1);
    else setBad(bad + 1);
  }

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={handleClick} rating="good" />
      <Button handleClick={handleClick} rating="neutral" />
      <Button handleClick={handleClick} rating="bad" />
      <Header title="statistics" />
      <Display rating="good" value={good} />
      <Display rating="neutral" value={neutral} />
      <Display rating="bad" value={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

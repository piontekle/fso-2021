import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, rating }) => (
  <button onClick={() => handleClick(rating)}>{rating}</button>
)

const Statistic = ({ rating, value }) => (
  <tr>
    <td>{rating}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, total, avg, avgGood }) => {
  if (total === 0) return <div>No feedback given</div>

  return (
    <table>
      <tbody>
        <Statistic rating="good" value={good} />
        <Statistic rating="neutral" value={neutral} />
        <Statistic rating="bad" value={bad} />
        <Statistic rating="total" value={total} />
        <Statistic rating="average" value={avg} />
        <Statistic rating="average positive" value={avgGood} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [avgGood, setAvgGood] = useState(0);

  const handleClick = (rating) => {
    let goodCt = good;
    let neutralCt = neutral;
    let badCt = bad;
    const totalCt = total + 1;

    setTotal(totalCt);

    if (rating === "good") {
      goodCt += 1;
      setGood(goodCt);
    } else if (rating === "neutral") {
      neutralCt += 1;
      setNeutral(neutralCt);
    } else {
      badCt += 1;
      setBad(badCt)
    };

    setAverages(goodCt, badCt, totalCt);
  }

  const setAverages = (good, bad, total) => {
    let totalScore = good - bad;

    const average = totalScore !== 0 ? totalScore / total : 0;
    const avgGood = good > 0 ? (good / total) * 100 : 0;

    setAverage(average);
    setAvgGood(avgGood);
  }

  return (
    <>
      <Header title="give feedback" />
      <Button handleClick={handleClick} rating="good" />
      <Button handleClick={handleClick} rating="neutral" />
      <Button handleClick={handleClick} rating="bad" />
      <Header title="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={average}
        avgGood={avgGood}
      />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

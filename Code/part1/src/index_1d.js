import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  var rounded_postivie_counts = Math.round(good / all * 100) / 100;
  var average = Math.round(((good * 1) + (bad * -1)) / all * 100) / 100;

  return (
    <table>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>Neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>Bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>ALL</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>Average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>Positive</td>
        <td>{rounded_postivie_counts}</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  var all = good + neutral + bad;

  const handleClick = (setting) => {
    if (setting == "Good") {
      return setGood(good + 1)
    } else if (setting == "Neutral") {
      return setNeutral(neutral + 1)
    } else {
      return setBad(bad + 1)
    }
  }

  return (
    <div>
      <p>
        Give feedback
      </p>
      <Button onClick={() => handleClick("Good")} text='Good' />
      <Button onClick={() => handleClick("Neutral")} text='Neutral' />
      <Button onClick={() => handleClick("Bad")} text='Bad' />

      <p>
        Statistics
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
      </p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

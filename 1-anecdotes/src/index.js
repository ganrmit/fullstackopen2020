import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes}) => (
  <p>
    {text}
    <br />
    has {votes} votes
  </p>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  // create an array of 0s to match anecdotes size
  const [votes, setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const [highest, setHighest] = useState(0)

  const nextAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdote)
  }

  const vote = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    if(newVotes[selected] >= newVotes[highest]) {
      setHighest(selected)
    }
    setVotes(newVotes)
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[highest]} votes={votes[highest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`)
  }

  return <div>
    {props.anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  return { anecdotes }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(
        anecdote => anecdote.id === id ?
          {...anecdote, votes: anecdote.votes + 1}
          : anecdote
      )
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'INIT_ANECDOTES':
      return action.data
    case 'UPDATE_ANECDOTE':
      const an = action.data
      return state.map(a => a.id === an.id ? an : a)
    default:
      return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const receivedAnecdote = await anecdoteService.update(newAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: receivedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
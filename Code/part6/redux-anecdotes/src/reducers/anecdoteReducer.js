import anecdoteService from "../services/AnecdoteService"
import { setNotification } from './NotificationReducer';

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INCREMENT':
      const changedAnecdote = action.data
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
    dispatch(setNotification(`You created "${newAnecdote.content}"`, 5)
    )
  }
}

export const incrementVotes = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(changedAnecdote)

    dispatch({
      type: 'INCREMENT',
      data: updatedAnecdote
    })

    dispatch(setNotification(
      `you voted "${updatedAnecdote.content.substring(0, 20)}..."`, 5)
    )
  }
}

export default anecdoteReducer
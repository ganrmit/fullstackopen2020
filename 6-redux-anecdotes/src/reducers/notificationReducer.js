const initialState = {
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if(state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        message: action.notification,
        timeoutId: action.timeoutId
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const notificationChange = (notification, timeoutId) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
    timeoutId
  }
}

const notificationClear = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export const setNotification = (notification, time = 5000) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch(notificationClear())
    }, time)
    dispatch(notificationChange(notification, timeoutID))
  }
}

export default notificationReducer
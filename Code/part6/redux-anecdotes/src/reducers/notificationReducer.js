

export const setNotification = (text, duration) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: text
        })

        setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const initialState = { text: 'welcome' }
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { text: action.data }

        case 'REMOVE_NOTIFICATION':
            return { text: '' }

        default:
            return state
    }
}

export default notificationReducer
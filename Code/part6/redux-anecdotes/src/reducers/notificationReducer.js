

export const setNotification = (text) => {
    return {
        type: 'SET_NOTIFICATION',
        data: text
    }
}

export const clearNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const initialState = { text: 'welcome'}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {text: action.data}

        case 'REMOVE_NOTIFICATION':
            return { text: ''}

        default:
            return state
    }
}

export default notificationReducer
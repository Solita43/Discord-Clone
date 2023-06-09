const GET_CHANNEL_MESSAGES = 'channels/GET_MESSAGES'

const getChannelMessages = (data, channelId) => {
    return {
        type: GET_CHANNEL_MESSAGES,
        data,
        channelId
    }
}

export const getChannelMessagesThunk = (channelId) => async dispatch => {
    const res = await fetch(`/api/channelMessages/${channelId}`)
    const data = await res.json()
    console.log(data)
    if (res.ok) {
        dispatch(getChannelMessages(data, channelId))
        return data
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_CHANNEL_MESSAGES:
            let channelId = action.channelId
            let data = action.data
            newState[channelId] = data
            console.log(state === newState)
            return newState
        default:
            return state
    }
}

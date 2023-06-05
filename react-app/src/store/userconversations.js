const GETUSERCONVERSATIONS = 'conversations/GET_CONVERSATIONS'
const CREATENEWCONVERSATION = 'conversations/CREATENEWCONVERSATION'

const getConversations = (data) => {
    return {
        type: GETUSERCONVERSATIONS,
        data
    }
}

const createNewConversation = (data) => {
    return {
        type: CREATENEWCONVERSATION,
        data
    }
}

export const getConversationsThunk = () => async (dispatch) => {
    const response = await fetch('/api/conversations')

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        }
        dispatch(getConversations(data))
    }
}

export const createNewConversationThunk = (username) => async (dispatch) => {
    const response = await fetch('/api/conversations')

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
}


const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETUSERCONVERSATIONS: {
            return { ...action.data }
        }
        case CREATENEWCONVERSATION: {
            return { ...state, [action.username.userId]: action.data }
        }

        default:
            return state


    }

}

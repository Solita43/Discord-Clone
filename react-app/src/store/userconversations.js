const GETUSERCONVERSATIONS = 'conversations/GET_CONVERSATIONS'
const CREATENEWCONVERSATION = 'conversations/CREATENEWCONVERSATION'
const DELETECONVERSATION = 'conversations/DELETECONVERSATION'

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

const deleteConversation = (data) => {
    return {
        type: DELETECONVERSATION,
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
    const response = await fetch('/api/conversations/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })


    const data = await response.json();

    if (response.ok) {

        dispatch(createNewConversation(data))
        return data
    } else {
        if (data.errors) {


            return data
        }

    }


}


export const deleteConversationThunk = (id, userId) => async dispatch => {
    const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE"
    })
    
    const data = await response.json()

    if (response.ok) {
  
        dispatch(deleteConversation(userId))
        return data;
    }
    if (data.errors) {
        return data
    }
}

const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETUSERCONVERSATIONS: {
            return { ...action.data }
        }
        case CREATENEWCONVERSATION: {
            return { ...state, ...action.data }
        }

        case DELETECONVERSATION: {
            let newState = { ...state }
            delete newState[action.data]
            return newState
        }

        default:
            return state


    }

}

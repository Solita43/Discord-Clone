const GETCONVERSATIONMESSAGES = 'conversations/GET_CONVERSATION_MESSAGES'


const getConversationMessages = (data) => {
    return {
        type: GETCONVERSATIONMESSAGES,
        data
    }
}

export const getConversationMessagesThunk = (id) => async (dispatch) => {

    const response = await fetch(`/api/conversations/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {

            return
        }

        dispatch(getConversationMessages(data))

    }
}

const initialState = {}
export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GETCONVERSATIONMESSAGES:
            let newState = { ...state, ...action.data }
            for (let key in newState) {
                newState[key]["messages"] = [...newState[key]["messages"]]
            }
            return newState
        default:
            return state;
    }
}

export const SET_BLOCK = 'SET_BLOCK'
export const UPDATE_BLOCK = 'UPDATE_BLOCK'
export const SET_CURR_USER = 'SET_CURR_USER'
export const SET_USERS_AMOUNT = 'SET_USERS_AMOUNT'

const initialState = {
    currBlock: null,
    currUser: null,
    usersAmount: 0,
}

export function blockReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_BLOCK:
            newState = { ...state, currBlock: action.currBlock }
            break
        case UPDATE_BLOCK:
            newState = { ...state }
            break
        case SET_CURR_USER:
            newState = { ...state, currUser: action.currUser }
            break
        case SET_USERS_AMOUNT:
            newState = { ...state, usersAmount: action.amount }
            break
        default:
    }
    return newState
}


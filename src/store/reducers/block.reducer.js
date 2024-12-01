export const SET_BLOCKS = 'SET_BLOCKS'
export const SET_BLOCK = 'SET_BLOCK'
export const REMOVE_BLOCK = 'REMOVE_BLOCK'
export const ADD_BLOCK = 'ADD_BLOCK'
export const UPDATE_BLOCK = 'UPDATE_BLOCK'
export const ADD_BLOCK_MSG = 'ADD_BLOCK_MSG'
export const SET_CURR_USER = 'SET_CURR_USER'

const initialState = {
    blocks: [],
    currBlock: null,
    currUser: {}

}

export function blockReducer(state = initialState, action) {
    var newState = state
    var blocks
    switch (action.type) {
        case SET_BLOCKS:
            newState = { ...state, blocks: action.blocks }
            break
        case SET_BLOCK:
            newState = { ...state, currBlock: action.currBlock }
            break
        case REMOVE_BLOCK:
            const lastRemovedBlock = state.blocks.find(block => block._id === action.blockId)
            blocks = state.blocks.filter(block => block._id !== action.blockId)
            newState = { ...state, blocks, lastRemovedBlock }
            break
        case ADD_BLOCK:
            newState = { ...state, blocks: [...state.blocks, action.block] }
            break
        case UPDATE_BLOCK:
            blocks = state.blocks.map(block => (block._id === action.block._id) ? action.block : block)
            newState = { ...state, blocks }
            break
        case ADD_BLOCK_MSG:
            newState = { ...state, currBlock: { ...state.currBlock, msgs: [...state.currBlock.msgs || [], action.msg] } }
            break
        case SET_CURR_USER:
            newState = { ...state, currUser: action.currUser }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const block1 = { _id: 'b101', vendor: 'Block ' + parseInt(Math.random() * 10), msgs: [] }
    const block2 = { _id: 'b102', vendor: 'Block ' + parseInt(Math.random() * 10), msgs: [] }

    state = blockReducer(state, { type: SET_BLOCKS, blocks: [block1] })
    console.log('After SET_BLOCKS:', state)

    state = blockReducer(state, { type: ADD_BLOCK, block: block2 })
    console.log('After ADD_BLOCK:', state)

    state = blockReducer(state, { type: UPDATE_BLOCK, block: { ...block2, vendor: 'Good' } })
    console.log('After UPDATE_BLOCK:', state)

    state = blockReducer(state, { type: REMOVE_BLOCK, blockId: block2._id })
    console.log('After REMOVE_BLOCK:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = blockReducer(state, { type: ADD_BLOCK_MSG, blockId: block1._id, msg })
    console.log('After ADD_BLOCK_MSG:', state)

    state = blockReducer(state, { type: REMOVE_BLOCK, blockId: block1._id })
    console.log('After REMOVE_BLOCK:', state)
}


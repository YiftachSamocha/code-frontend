import { blockService } from '../services/block.service'
import { SET_BLOCK, UPDATE_BLOCK } from './block.reducer'
import { store } from './store'

export async function loadBlock(type) {
    try {
        const block = await blockService.getByType(type)
        store.dispatch(getCmdSetBlock(block))
        return block
    } catch (err) {
        console.log('Cannot load block', err)
        throw err
    }
}

export async function updateBlock(block) {
    try {
        const savedBlock = await blockService.save(block)
        store.dispatch(getCmdUpdateBlock(savedBlock))
        return savedBlock
    } catch (err) {
        console.log('Cannot save block', err)
        throw err
    }
}


// Command Creators:

function getCmdSetBlock(currBlock) {
    return {
        type: SET_BLOCK,
        currBlock
    }
}

function getCmdUpdateBlock(block) {
    return {
        type: UPDATE_BLOCK,
        block
    }
}



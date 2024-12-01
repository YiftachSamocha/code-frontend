import { store } from '../store'
import { ADD_BLOCK, REMOVE_BLOCK, SET_BLOCKS, SET_BLOCK, UPDATE_BLOCK, ADD_BLOCK_MSG } from '../reducers/block.reducer'
import { blockService } from '../../services/block/block.service'

export async function loadBlocks(filterBy) {
    try {
        const blocks = await blockService.query(filterBy)
        store.dispatch(getCmdSetBlocks(blocks))
    } catch (err) {
        console.log('Cannot load blocks', err)
        throw err
    }
}

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


export async function removeBlock(blockId) {
    try {
        await blockService.remove(blockId)
        store.dispatch(getCmdRemoveBlock(blockId))
    } catch (err) {
        console.log('Cannot remove block', err)
        throw err
    }
}

export async function addBlock(block) {
    try {
        const savedBlock = await blockService.save(block)
        store.dispatch(getCmdAddBlock(savedBlock))
        return savedBlock
    } catch (err) {
        console.log('Cannot add block', err)
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

export async function addBlockMsg(blockId, txt) {
    try {
        const msg = await blockService.addBlockMsg(blockId, txt)
        store.dispatch(getCmdAddBlockMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add block msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetBlocks(blocks) {
    return {
        type: SET_BLOCKS,
        blocks
    }
}
function getCmdSetBlock(currBlock) {
    return {
        type: SET_BLOCK,
        currBlock
    }
}
function getCmdRemoveBlock(blockId) {
    return {
        type: REMOVE_BLOCK,
        blockId
    }
}
function getCmdAddBlock(block) {
    return {
        type: ADD_BLOCK,
        block
    }
}
function getCmdUpdateBlock(block) {
    return {
        type: UPDATE_BLOCK,
        block
    }
}
function getCmdAddBlockMsg(msg) {
    return {
        type: ADD_BLOCK_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadBlocks()
    await addBlock(blockService.getEmptyBlock())
    await updateBlock({
        _id: 'm1oC7',
        title: 'Block-Good',
    })
    await removeBlock('m1oC7')
    // TODO unit test addBlockMsg
}

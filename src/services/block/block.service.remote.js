import { httpService } from '../http.service'

export const blockService = {
    query,
    getById,
    save,
    remove,
    addBlockMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`block`, filterBy)
}

function getById(blockId) {
    return httpService.get(`block/${blockId}`)
}

async function remove(blockId) {
    return httpService.delete(`block/${blockId}`)
}
async function save(block) {
    var savedBlock
    if (block._id) {
        savedBlock = await httpService.put(`block/${block._id}`, block)
    } else {
        savedBlock = await httpService.post('block', block)
    }
    return savedBlock
}

async function addBlockMsg(blockId, txt) {
    const savedMsg = await httpService.post(`block/${blockId}/msg`, {txt})
    return savedMsg
}

import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'block'

export const blockService = {
    query,
    getById,
    save,
    remove,
    addBlockMsg
}
window.cs = blockService


async function query(filterBy = { txt: '', price: 0 }) {
    var blocks = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        blocks = blocks.filter(block => regex.test(block.vendor) || regex.test(block.description))
    }
    if (minSpeed) {
        blocks = blocks.filter(block => block.speed >= minSpeed)
    }
    if(sortField === 'vendor' || sortField === 'owner'){
        blocks.sort((block1, block2) => 
            block1[sortField].localeCompare(block2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        blocks.sort((block1, block2) => 
            (block1[sortField] - block2[sortField]) * +sortDir)
    }
    
    blocks = blocks.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return blocks
}

function getById(blockId) {
    return storageService.get(STORAGE_KEY, blockId)
}

async function remove(blockId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, blockId)
}

async function save(block) {
    var savedBlock
    if (block._id) {
        const blockToSave = {
            _id: block._id,
            price: block.price,
            speed: block.speed,
        }
        savedBlock = await storageService.put(STORAGE_KEY, blockToSave)
    } else {
        const blockToSave = {
            vendor: block.vendor,
            price: block.price,
            speed: block.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedBlock = await storageService.post(STORAGE_KEY, blockToSave)
    }
    return savedBlock
}

async function addBlockMsg(blockId, txt) {
    // Later, this is all done by the backend
    const block = await getById(blockId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    block.msgs.push(msg)
    await storageService.put(STORAGE_KEY, block)

    return msg
}
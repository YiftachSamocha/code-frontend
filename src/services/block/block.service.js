import { httpService } from '../http.service'

export const blockService = {
    query,
    getByType,
    save,
    remove,
    getTitle,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`block`, filterBy)
}

function getByType(type) {
    return httpService.get(`block/${type}`)
}

async function remove(blockId) {
    return httpService.delete(`block/${blockId}`)
}
async function save(block) {
    const savedBlock = await httpService.put(`block`, block)
    return savedBlock
}


function getTitle(type) {
    switch (type) {
        case 'async':
            return 'Async case'
        case 'dom':
            return 'DOM manipulation'
        case 'array':
            return 'Array methods'
        case 'event':
            return 'Event loop'
        case 'error':
            return 'Error handeling'
        case 'data':
            return 'Data structures'

        default: ''
    }
}
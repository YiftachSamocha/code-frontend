import { httpService } from './http.service'

export const blockService = {
    getByType,
    save, 
}

function getByType(type) {
    return httpService.get(`block/${type}`)
}


async function save(block) {
    const savedBlock = await httpService.put(`block`, block)
    return savedBlock
}
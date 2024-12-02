import { httpService } from '../http.service'

export const blockService = {
    query,
    getByType,
    save,
    remove,
    getTitle,
    compareFunctions,
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

function parseFunctionCode(code) {
    try {
        return parse(code);
    } catch (err) {
        console.error('Error parsing code:', err);
        return null;
    }
}

// Function to compare two functions
function compareFunctions(func1, func2) {
    const ast1 = parseFunctionCode(func1);
    const ast2 = parseFunctionCode(func2);

    if (!ast1 || !ast2) {
        return false; // If either cannot be parsed, return false
    }

    // Compare the two ASTs (this could be more sophisticated, but for now, we will use deep equality)
    return JSON.stringify(ast1) === JSON.stringify(ast2);
}
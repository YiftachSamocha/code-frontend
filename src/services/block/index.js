const { DEV, VITE_LOCAL } = import.meta.env

import { blockService as local } from './block.service.local'
import { blockService as remote } from './block.service.remote'

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

const service = VITE_LOCAL === 'true' ? local : remote
export const blockService = { getTitle, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.blockService = blockService

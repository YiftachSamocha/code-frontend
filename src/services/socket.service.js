import io from 'socket.io-client'

export const SOCKET_EMIT_SET_BLOCK_TYPE = 'set-block-type'
export const SOCKET_EMIT_EDIT_BLOCK = 'edit-block'
export const SOCKET_EMIT_SEND_QUESTION = 'send-question'
export const SOCKET_EMIT_SEND_ANSWER = 'send-answer'

export const SOCKET_EVENT_BLOCK_TYPE_CHOSEN = 'block-type-chosen'
export const SOCKET_EVENT_BLOCK_EDITED = 'block-edited'
export const SOCKET_EVENT_SET_CURR_USER = 'set-curr-user'
export const SOCKET_EVENT_SET_USERS_AMOUNT= 'set-users-amount'
export const SOCKET_EVENT_GET_QUESTION = 'get-question'
export const SOCKET_EVENT_GET_ANSWER = 'get-answer'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()


// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}


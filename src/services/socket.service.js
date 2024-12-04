import io from 'socket.io-client'
export const SOCKET_EMIT_GET_BLOCK_TYPE = 'get-block-type'
export const SOCKET_EMIT_GET_CURR_USER = 'get-curr-user'
export const SOCKET_EMIT_GET_USERS_AMOUNT= 'get-users-amount'
export const SOCKET_EMIT_EDIT_BLOCK = 'edit-block'
export const SOCKET_EMIT_SEND_QUESTION = 'send-question'
export const SOCKET_EMIT_SEND_ANSWER = 'send-answer'


export const SOCKET_EVENT_SET_BLOCK_TYPE = 'set-block-type'
export const SOCKET_EVENT_SET_CURR_USER = 'set-curr-user'
export const SOCKET_EVENT_SET_USERS_AMOUNT = 'set-users-amount'
export const SOCKET_EVENT_BLOCK_EDITED = 'block-edited'
export const SOCKET_EVENT_GET_QUESTION = 'get-question'
export const SOCKET_EVENT_GET_ANSWER = 'get-answer'
export const SOCKET_EVENT_BAD_CONNECTION = 'bad-connection'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()


// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  let isSetupComplete = false
  const socketService = {
    setup() {
      socket = io(baseUrl)
      isSetupComplete = true
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
      if (isSetupComplete) {
        setTimeout(() => socket.emit(eventName, data), 100)
      }
    },
    terminate() {
      socket = null
    },
    isConnected() {
      return socket && socket.connected;
    },

  }
  return socketService
}


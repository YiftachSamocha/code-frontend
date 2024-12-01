import io from 'socket.io-client'
import { userService } from './user'

export const SOCKET_EMIT_SET_BLOCK_TYPE = 'set-block-type'
export const SOCKET_EMIT_EDIT_BLOCK = 'edit-block'
// export const SOCKET_EMIT_MENTOR_LEAVES_BLOCK = 'mentor-leaves-block'

export const SOCKET_EVENT_BLOCK_TYPE_CHOSEN = 'block-type-chosen'
export const SOCKET_EVENT_BLOCK_EDITED = 'block-edited'
export const SOCKET_EVENT_SET_CURR_USER = 'set-curr-user'
// export const SOCKET_EVENT_MENTOR_LEFT_BLOCK = 'mentor-left-block'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
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
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}


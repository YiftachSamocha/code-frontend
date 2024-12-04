import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { CodeIndex } from './pages/CodeIndex'
import { Lobby } from './pages/Lobby'
import { SOCKET_EMIT_GET_BLOCK_TYPE, SOCKET_EMIT_GET_CURR_USER, SOCKET_EMIT_GET_USERS_AMOUNT, SOCKET_EVENT_BAD_CONNECTION, SOCKET_EVENT_SET_BLOCK_TYPE, SOCKET_EVENT_SET_CURR_USER, SOCKET_EVENT_SET_USERS_AMOUNT, socketService } from './services/socket.service'
import { useDispatch } from 'react-redux'
import { SET_CURR_USER, SET_USERS_AMOUNT } from './store/block.reducer'
import { QuestionMsg } from './cmps/msgs-cmps/QuestionMsg'
import { GiveAnswer } from './cmps/msgs-cmps/GiveAnswer'
import { AnswerMsg } from './cmps/msgs-cmps/AnswerMsg'
import { loadBlock } from './store/block.actions'

export function RootCmp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [currQuestion, setCurrQuestion] = useState(null)

    // This useEffect sets up listeners for socket events when the component mounts
    useEffect(() => {
        socketService.on(SOCKET_EVENT_SET_BLOCK_TYPE, setBlock)  // Listen for block type updates
        socketService.on(SOCKET_EVENT_SET_CURR_USER, setUser)  // Listen for current user updates
        socketService.on(SOCKET_EVENT_SET_USERS_AMOUNT, setUsersAmount)  // Listen for user amount updates
        socketService.on(SOCKET_EVENT_BAD_CONNECTION, badConnection)  // Listen for bad connection event
        return () => {
            // Cleanup listeners when the component unmounts
            socketService.off(SOCKET_EVENT_SET_BLOCK_TYPE, setBlock)
            socketService.off(SOCKET_EVENT_SET_CURR_USER, setUser)
            socketService.off(SOCKET_EVENT_SET_USERS_AMOUNT, setUsersAmount)
            socketService.off(SOCKET_EVENT_BAD_CONNECTION, badConnection)
        }
    }, [])

    // This useEffect triggers when the location (URL path) changes
    useEffect(() => {
        let type = getCurrentTypeFromPath()  // Extract block type from the current path
        socketService.emit(SOCKET_EMIT_GET_BLOCK_TYPE, type)  // Emit request for block type
        socketService.emit(SOCKET_EMIT_GET_CURR_USER, null)  // Emit request for current user
        socketService.emit(SOCKET_EMIT_GET_USERS_AMOUNT, null)  // Emit request for user amount
    }, [location])

    // Function to handle block type setting, and navigate to lobby if the mentor left the block
    async function setBlock(type) {
        const block = await loadBlock(type)
        const inLobby = window.location.pathname === '/lobby' || window.location.pathname === '/'
        if (!block && !inLobby) {
            navigate('/lobby')
        }
    }

    // Function to set the current user in the Redux store
    function setUser(user) {
        dispatch({ type: SET_CURR_USER, currUser: user })
    }

    // Function to set the number of users in the Redux store
    function setUsersAmount(amount) {
        dispatch({ type: SET_USERS_AMOUNT, amount })
    }

    // Function to handle situation in which the user wrote in the search bar an un current block
    async function badConnection(type) {
        await setBlock(type)
        navigate('/lobby')
    }

    // Function to extract the block type from the current URL path
    function getCurrentTypeFromPath() {
        const pathParts = location.pathname.split('/')
        if (pathParts[1] === 'code' && pathParts[2]) return pathParts[2]
        return null
    }

    return (
        <div className="main-container">
            <AppHeader />
            <QuestionMsg onAnswer={setCurrQuestion} />
            <AnswerMsg />
            <main>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/code/:type" element={<CodeIndex />} />
                </Routes>
            </main>

            {currQuestion && <div className='modal-cont'>
                <GiveAnswer question={currQuestion} close={() => setCurrQuestion(null)} />
            </div>}
        </div>
    )
}

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

    useEffect(() => {
        socketService.on(SOCKET_EVENT_SET_BLOCK_TYPE, setBlock)
        socketService.on(SOCKET_EVENT_SET_CURR_USER, setUser)
        socketService.on(SOCKET_EVENT_SET_USERS_AMOUNT, setUsersAmount)
        socketService.on(SOCKET_EVENT_BAD_CONNECTION, badConnection)
        return () => {
            socketService.off(SOCKET_EVENT_SET_BLOCK_TYPE, setBlock)
            socketService.off(SOCKET_EVENT_SET_CURR_USER, setUser)
            socketService.off(SOCKET_EVENT_SET_USERS_AMOUNT, setUsersAmount)
            socketService.off(SOCKET_EVENT_BAD_CONNECTION, badConnection)
        }
    }, [])


    useEffect(() => {
        let type = getCurrentTypeFromPath()
        socketService.emit(SOCKET_EMIT_GET_BLOCK_TYPE, type)
        socketService.emit(SOCKET_EMIT_GET_CURR_USER, null)
        socketService.emit(SOCKET_EMIT_GET_USERS_AMOUNT, null)
    }, [location])


    async function setBlock(type) {
        const block = await loadBlock(type)
        const inLobby = window.location.pathname === '/lobby' || window.location.pathname === '/'
        if (!block && !inLobby) {
            navigate('/lobby')
        }
    }

    function setUser(user) {
        dispatch({ type: SET_CURR_USER, currUser: user })
    }

    function setUsersAmount(amount) {
        dispatch({ type: SET_USERS_AMOUNT, amount })
    }

    async function badConnection(type) {
        await setBlock(type)
        navigate('/lobby')
    }

    function getCurrentTypeFromPath() {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'code' && pathParts[2]) return pathParts[2];
        return null; // Return null or default if no type is found
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



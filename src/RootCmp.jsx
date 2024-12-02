import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { CodeIndex } from './pages/CodeIndex'
import { Lobby } from './pages/Lobby'
import { SOCKET_EVENT_SET_USERS_AMOUNT, socketService } from './services/socket.service'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USERS_AMOUNT } from './store/reducers/block.reducer'
import { QuestionMsg } from './cmps/msgs-cmps/QuestionMsg'
import { GiveAnswer } from './cmps/msgs-cmps/GiveAnswer'
import { AnswerMsg } from './cmps/msgs-cmps/AnswerMsg'

export function RootCmp() {
    const dispatch = useDispatch()
    const [currQuestion, setCurrQuestion] = useState(null)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_SET_USERS_AMOUNT, changeUsersAmount)

        return () => {
            socketService.off(SOCKET_EVENT_SET_USERS_AMOUNT, changeUsersAmount)
        }

    }, [])

    function changeUsersAmount(amount) {
        dispatch({ type: SET_USERS_AMOUNT, amount })
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



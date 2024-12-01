import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { CodeIndex } from './pages/CodeIndex'
import { Lobby } from './pages/Lobby'
import { socketService } from './services/socket.service'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USERS_AMOUNT } from './store/reducers/block.reducer'

export function RootCmp() {
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on('set-users-amount', changeUsersAmount)

        return () => {
            socketService.off('set-users-amount', changeUsersAmount)
        }

    }, [])

    function changeUsersAmount(amount) {
        dispatch({ type: SET_USERS_AMOUNT, amount })
    }

    
    return (
        <div className="main-container">
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/code/:type" element={<CodeIndex />} />
                </Routes>
            </main>

        </div>
    )
}



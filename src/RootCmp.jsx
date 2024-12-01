import React from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { CodeIndex } from './pages/CodeIndex'
import { Lobby } from './pages/Lobby'

export function RootCmp() {
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



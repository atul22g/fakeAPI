import React from 'react'
import { NavLink } from 'react-router-dom'
import { getAuth } from '../actions/utils'

const Appbar = () => {
    let auth = getAuth()
    
    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex align-middle justify-between">
                FakeAPI
            <div className="flex items-center gap-3 font-mono">
                <a
                    rel="noopener noreferrer"
                    href="/"
                    className="text-md font-semibold rounded-xl px-3 py-2 box-border transition hover:bg-gray-200 active:scale-95">
                    Docs
                </a>
                {
                    auth ? 
                    <NavLink to="/dashboard" className="text-md font-semibold rounded-xl px-3 py-1 box-border border-2 border-gray-800 transition hover:bg-gray-200 active:scale-95"> Profile </NavLink>
                    : <NavLink to="/login" className="text-md font-semibold rounded-xl px-3 py-1 box-border border-2 border-gray-800 transition hover:bg-gray-200 active:scale-95"> Login </NavLink>
                }
            </div>
        </div>
    )
}

export default Appbar
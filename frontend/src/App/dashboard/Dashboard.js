import React from 'react'
import Appbar from '../../components/Appbar'
import { getAuth } from '../../actions/utils'

const Dashboard = () => {
    let auth = getAuth()
    if (!auth) {
        window.location.href = '/login'
    }

    return (
        <div className="min-h-full font-mono text-gray-900">
            <Appbar />
        </div>
    )
}

export default Dashboard
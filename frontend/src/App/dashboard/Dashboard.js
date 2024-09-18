import React from 'react'
import Appbar from '../../components/Appbar'
import { getToken } from '../../actions/utils'

const Dashboard = () => {
    let token = getToken()
    if (!token) {
        window.location.href = '/login'
    }

    return (
        <div className="min-h-full font-mono text-gray-900">
            <Appbar />
        </div>
    )
}

export default Dashboard
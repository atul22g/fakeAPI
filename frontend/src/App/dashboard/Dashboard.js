import React from 'react'
import Appbar from '../../components/Appbar'

const Dashboard = () => {
    const token = localStorage.getItem('fakeAPIToken');
    if (!token) {
        window.location.href = '/login'
    }

    return (
        <div className="min-h-full font-mono text-gray-900">
            <Appbar />
            <div className="max-w-6xl mx-auto px-3 sm:px-4">
            </div>
        </div>
    )
}

export default Dashboard
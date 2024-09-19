import React from 'react'
import Appbar from '../../components/Appbar'
import ParojectBar from './Projects/ParojectBar';

const Dashboard = () => {
    const ID = localStorage.getItem('fakeAPI_ID');
    if (!ID) {
        window.location.href = '/login'
    }

    return (
        <div className="min-h-full font-mono text-gray-900">
            <Appbar />
            <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <ParojectBar />
            </div>
        </div>
    )
}

export default Dashboard
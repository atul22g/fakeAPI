import React from 'react'
import Appbar from '../../components/Appbar'
import Landing from '../../components/comman/Landing';
// import { getToken } from '../../_actions/utils';

const Home = () => {
    // let token = getToken()
    // if (token) {
    //     window.location.href = '/dashboard'
    // }
    
    return (
        <div className="min-h-full font-mono text-gray-900">

            <Appbar />
            <div className="max-w-6xl mx-auto p-3 sm:p-4">
            <Landing/>
            </div>
        </div>
    )
}

export default Home
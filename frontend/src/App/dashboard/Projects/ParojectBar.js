import React from 'react'
import { Link } from 'react-router-dom'
import { NewProject} from './Modal'
import { toggleModal } from '../../../func/AllFunc'

const ParojectBar = () => {
    return (
        <>
        <NewProject/>
            <div className="relative flex items-center justify-between flex-nowrap">
                <div className="flex items-center flex-nowrap gap-3 h-16 text-base font-mono font-medium">
                    <Link to="/projects" className="text-xl">
                        Projects
                    </Link>
                    <div className="text-gray-400 font-bold after:content-['/']" />
                    <span onClick={() => toggleModal()} className='box-border relative transition hover:scale-105 active:scale-95shadow active:shadow-sm focus:outline outline-2 outline-offset-2outline-blue-500 hover:outline-none cursor-pointer w-9 h-9 rounded-xl bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 active:bg-blue-700 text-whitedisabled:shadow-none disabled:bg-blue-400 flex items-center p-2'>
                        <i style={{ paddingLeft: '2px' }} className="fa-solid fa-plus text-white"></i>
                    </span>
                </div>
            </div>
        </>
    )
}

export default ParojectBar
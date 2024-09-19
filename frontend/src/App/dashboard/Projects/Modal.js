import React, { useState } from 'react'
import { toggleModal } from '../../../func/AllFunc'
import { CreateProject } from '../../../store/slices/projectSlice';
import { useDispatch } from 'react-redux';

export const NewProject = () => {
    const dispatch = useDispatch();
    // State to manage form inputs and submission status
    const [formState, setFormState] = useState({ name: '', prefix: '', });
    // Handle input changes
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // export Data to be submitted
    const { name, prefix } = formState;
    // Handle form submission
    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(CreateProject({ name, prefix }));
        setFormState({ name: '', prefix: '' });
    };
    return (
        <>
            <div id='NewProjectModal' className="hidden fixed z-10 top-0 bottom-0 left-0 right-0 bg-gray-900/30 overflow-y-auto overflow-x-hidden">
                <div className="relative mx-auto mt-14 mb-5 rounded-2xl bg-white shadow-md max-w-md">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-xs uppercase tracking-wider font-bold text-gray-500">New project</h1>
                        <button onClick={() => toggleModal()} className="box-border relative transition hover:scale-105 active:scale-95 shadow active:shadow-sm focus:outline outline-2 outline-offset-2 outline-blue-500 hover:outline-none cursor-pointer w-9 h-9 rounded-xl bg-transparent hover:bg-gray-200 active:bg-gray-300 shadow-none disabled:shadow-none disabled:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={(e) => onSubmit(e)} className="grid grid-cols-1 gap-6 px-4" >
                        <div className="space-y-3 font-mono">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-lg font-semibold">Name</label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <input
                                    className="appearance-none px-3 py-2 rounded-xl bg-gray-100 w-full border border-gray-100 text-base font-mono focus:outline outline-2 outline-offset-2 outline-blue-500 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-100 focus:border-gray-100"
                                    type="text"
                                    placeholder="Example: Todo App, Project X..."
                                    value={name}
                                    name='name'
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="space-y-3 font-mono">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-lg font-semibold">API Prefix</label>
                                </div>
                                <div className="text-sm text-gray-900">Add API prefix to all endpoints in this project.</div>
                            </div>
                            <div className="space-y-2">
                                <input
                                    className="appearance-none px-3 py-2 rounded-xl bg-gray-100 w-full border border-gray-100 text-base font-mono focus:outline outline-2 outline-offset-2 outline-blue-500 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-100 focus:border-gray-100"
                                    type="text"
                                    placeholder="Example: /api/v1"
                                    value={prefix}
                                    name='prefix'
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sticky bottom-0 justify-between p-4 bg-gray-50 rounded-br-2xl rounded-bl-2xl -mx-4">
                            <button
                                onClick={() => toggleModal()}
                                type="button"
                                className="w-full appearance-none truncate box-border transition active:scale-95 shadow active:shadow-sm focus:outline outline-2 outline-offset-2 outline-blue-500 hover:outline-none border-2 border-transparent font-medium disabled:opacity-75 disabled:shadow-none disabled:pointer-events-none cursor-pointer bg-transparent hover:bg-gray-200 active:bg-gray-300 shadow-none px-3 py-2 rounded-2xl text-base"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full appearance-none truncate box-border transition active:scale-95 shadow active:shadow-sm focus:outline outline-2 outline-offset-2 outline-blue-500 hover:outline-none border-2 border-transparent font-medium disabled:opacity-75 disabled:shadow-none disabled:pointer-events-none cursor-pointer bg-blue-500 shadow-blue-500/50 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-2 rounded-2xl text-base"
                            // disabled={!name || !prefix} 
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

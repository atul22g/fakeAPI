import React, { useState } from 'react';
import fakeProject from './fakeProject';
import { NavLink } from 'react-router-dom';
import Button from '../Button/TextButton';
import Card from '../Card';
import ResourceSchemaEditorDemo from '../../../App/Home/ResourceSchemaEditorDemo';
import ProjectPreview from '../../../App/Home/ProjectPreview';
import EndpointsTable from './EndpointsTable';
import { cloneDeep } from 'lodash';
// import ProjectPreview from '../../../Home/ProjectPreview';

const Landing = () => {
    const [resources, setResources] = useState(fakeProject[1].resources);
    return (
        <>
            {/* Hero Section */}
            <div className="grid grid-cols-1 gap-32 pt-32 sm:gap-60 sm:pt-60 pb-24 font-mono">
                <div className="grid grid-cols-1 gap-10 justify-items-center text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        The easiest way to mock REST APIs
                    </h1>
                    <div className="grid gap-4 justify-items-center">
                        <p className="text-xl leading-relaxed">
                            Quickly setup endpoints, generate custom data, and perform
                            operations on it using RESTful interface
                        </p>
                        <div className="w-full sm:w-80 hidden md:block">
                            <NavLink to="/signup">
                                <Button
                                    fullWidth
                                    variant="primary"
                                    size="lg">
                                    Get started
                                </Button>
                            </NavLink>
                        </div>
                        <div className="w-full sm:w-80 block md:hidden">
                            <NavLink to="/signup">
                                <Button
                                    fullWidth
                                    variant="primary"
                                    size="md">
                                    Get started
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            {/* Simple data modeling */}
            <div className="grid grid-cols-1 gap-32 pt-32 sm:gap-60 sm:pt-60 pb-24 font-mono">
                <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
                    <div className="col-span-3 self-center grid gap-4">
                        <h2 className="text-2xl font-bold">Simple data modeling</h2>
                        <p className="text-xl leading-relaxed">
                            Define resource schema and data generators for each field
                        </p>
                    </div>
                    <div className="col-span-5">
                        <Card odd heading="Resource schema">
                            <ResourceSchemaEditorDemo />
                        </Card>
                    </div>
                </div>
            </div>
            {/* Relations between resources */}
            <div className="grid gap-12">
                <div className="grid gap-4">
                    <h1 className="text-2xl font-bold">Relations between resources</h1>
                    <p className="text-xl leading-relaxed">
                        Setup relations between resoures and automatically generate
                        endpoints
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <Card heading="Resource tree">
                        <ProjectPreview
                            onChange={resources => {
                                setResources(cloneDeep(resources));
                            }}
                        />
                    </Card>
                    <EndpointsTable resources={resources} />
                </div>
            </div>
            {/* Footer */}
            <div className="py-4" style={{marginTop: '8em'}}>
                <h4 className="uppercase text-xs font-bold text-gray-400 tracking-wider">
                    Contact
                </h4>
                <div>atul22gcoder@gmail.com</div>
            </div>
        </>
    )
}

export default Landing
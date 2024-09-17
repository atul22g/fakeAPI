import React, { useState } from 'react';
import { cloneDeep, each, filter, noop, uniqueId } from 'lodash';

import { ResourceTree } from '../../components/comman/ResourceTree/ResourceTree';
import fakeProject from '../../components/comman/Landing/fakeProject';
import Button from '../../components/comman/Button/TextButton';

export default function ProjectPreview({ onChange }) {
    let { resetProject, ...projectHook } = useFakeProject(onChange);

    return (
        <div className="relative">
            <div className="absolute " style={{ top: -44, right: -8 }}>
                <Button variant="minimal" size="sm" onClick={resetProject}>
                    Reset
                </Button>
            </div>
            <ResourceTree
                {...{
                    ...projectHook,
                    showForm: noop,
                    isDemo: true,
                }}
            />
        </div>
    );
}

function useFakeProject(onChange) {
    let [project, setProject] = useState(cloneDeep(fakeProject[1]));
    let [selectedResourceId, setSelectedResourceId] = useState(null);
    let updateRelation = ({
        clone: shouldClone,
        destinationId,
        sourceId,
        callback,
    }) => {
        let source = findResource(sourceId, project.resources);
        const destination = findResource(destinationId, project.resources);
        let resources = shouldClone
            ? project.resources
            : filterResources(sourceId, project.resources);

        if (!source || !destination) {
            callback();
            return;
        }

        resetCount(source);

        if (shouldClone) {
            source = cloneDeep(source);
            updateId(source);
        }

        destination.children.push(source);
        callback();
        setProject({ ...project, resources });
        onChange(resources);
    };

    return {
        project,
        selectedResourceId,
        generateAll: () =>
            setProject({
                ...project,
                resources: generateAll(project.resources),
            }),
        resetAll: () =>
            setProject({
                ...project,
                resources: resetAll(project.resources),
            }),
        generateData: ({ canGenerate, count, resourceId, prevCount }) =>
            canGenerate &&
            setProject({
                ...project,
                resources: generateData({
                    resources: project.resources,
                    count,
                    resourceId,
                    prevCount,
                }),
            }),
        resetProject: () => {
            const newProject = cloneDeep(fakeProject[0]);
            onChange(newProject.resources);
            setProject(newProject);
        },
        selectResource: id => setSelectedResourceId(id),
        updateRelation,
    };
}

function generateAll(resources) {
    return resources.map(r => ({
        ...r,
        count: 50,
        children: r.children ? generateAll(r.children) : [],
    }));
}

function resetAll(resources) {
    return resources.map(r => ({
        ...r,
        count: 0,
        children: r.children ? resetAll(r.children) : [],
    }));
}

function generateData({ resources, count, prevCount, resourceId }) {
    return resources.map(r => {
        if (r.id === resourceId) {
            return {
                ...r,
                count,
                children: count >= prevCount ? r.children : resetAll(r.children),
            };
        }

        return {
            ...r,
            children: generateData({
                resources: r.children,
                count,
                prevCount,
                resourceId,
            }),
        };
    });
}

function findResource(resourceId, resources) {
    var result;

    each(resources, function (resource) {
        if (!result) {
            if (resource.id === resourceId) {
                result = resource;
            } else if (resource.children) {
                result = findResource(resourceId, resource.children);
            }
        }
    });

    return result;
}

function filterResources(id, resources) {
    var filtered;

    filtered = filter(resources, function (resource) {
        if (resource.id !== id && resource.children) {
            resource.children = filterResources(id, resource.children);
        }
        return resource.id !== id;
    });

    return filtered;
}

function resetCount(resource) {
    resource.count = 0;
    each(resource.children, resetCount);
}

function updateId(resource) {
    resource.id = uniqueId('resource');
    each(resource.children, updateId);
}

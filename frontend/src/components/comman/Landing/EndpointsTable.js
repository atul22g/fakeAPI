import React, { useMemo } from 'react';

import { each } from 'lodash';

function getEndpoints(resources, base = '') {
    let result = [];

    each(resources, function (r) {
        const resourceId = `${r.name.slice(0, r.name.length - 1)}Id`;
        const newBase = `${base}/${r.name}/{${resourceId}}`;
        result.push(`${base}/${r.name}/{?${resourceId}}`);
        result.push(`/${r.name}/{?${resourceId}}`);
        result = result.concat(getEndpoints(r.children, newBase));
        result = result.concat(
            getEndpoints(r.children, `/${r.name}/{${resourceId}}`)
        );
    });

    return result;
}

export default function EndpointsTable({ resources }) {
    const endpoints = useMemo(() => {
        const duplicates = getEndpoints(resources);
        return [...new Set(duplicates)].sort(
            (a, b) => a.split('/').length - b.split('/').length
        );
    }, [resources]);

    return (
        <div className="space-y-4 pt-6">
            <h4 className="uppercase text-xs text-gray-400 font-bold tracking-wider">
                Generated endpoints
            </h4>
            <div className="grid gap-2">
                {endpoints.map(endpoint => (
                    <div
                        className="rounded-md bg-gray-200 p-2 text-sm font-medium"
                        key={endpoint}>
                        <code>{endpoint}</code>
                    </div>
                ))}
            </div>
        </div>
    );
}

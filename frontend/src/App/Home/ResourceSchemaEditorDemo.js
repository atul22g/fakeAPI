import React, { useState } from 'react';
import { noop } from 'lodash';
import Button from '../../components/comman/Button/TextButton';
import ResourceSchemaEditor from './ResourceSchemaEditor';

const INIT_STATE = [
    {
        name: 'id',
        type: 'Object ID',
    },
    {
        name: 'createdAt',
        type: 'Faker.js',
        fakerMethod: 'date.recent',
    },
    {
        name: 'name',
        type: 'Faker.js',
        fakerMethod: 'name.findName',
    },
    {
        name: 'avatar',
        type: 'Faker.js',
        fakerMethod: 'image.avatar',
    },
];

export default function ResourceSchemaEditorDemo() {
    const [schema, setSchema] = useState(INIT_STATE);
    const resetProject = () => setSchema(INIT_STATE);
    const addSchemaItem = () =>
        setSchema([...schema, { name: '', type: 'Faker.js' }]);
    const deleteSchemaItem = deleteIdx =>
        setSchema(schema.filter((_, idx) => deleteIdx !== idx));
    const onSchemaItemChange = (updateIdx, updatedItem) =>
        setSchema(
            schema.map((item, idx) => (idx === updateIdx ? updatedItem : item))
        );

    return (
        <div className="relative">
            <div className="absolute " style={{ top: -44, right: -8 }}>
                <Button variant="minimal" size="sm" onClick={resetProject}>
                    Reset
                </Button>
            </div>

            <ResourceSchemaEditor
                errors={{}}
                schema={schema}
                childResources={[]}
                onSchemaItemChange={onSchemaItemChange}
                onSchemaError={noop}
                addSchemaItem={addSchemaItem}
                deleteSchemaItem={deleteSchemaItem}
            />
        </div>
    );
}

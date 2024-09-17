import Input from '../../components/comman/Form/Input';
import Alert from '../../components/comman/Form/Alert';
import React, { Component } from 'react';
import IconButton from '../../components/comman/Button/IconButton';
import Select from '../../components/comman/Select';
import fakerMethods from '../../components/comman/ResourceForm/fakerMethods';
import { validFieldName } from '../utils/validators';


const getOptions = ({ hasParent, hasChildren }) => {
    let options = [
        { label: 'Faker.js', value: 'Faker.js' },
        { label: 'String', value: 'String' },
        { label: 'Number', value: 'Number' },
        { label: 'Boolean', value: 'Boolean' },
        { label: 'Object', value: 'Object' },
        { label: 'Array', value: 'Array' },
        { label: 'Date', value: 'Date' },
    ];

    if (hasParent) {
        options = [
            ...options,
            { label: 'Parent Resource', value: 'Parent Resource' },
        ];
    }

    if (hasChildren) {
        options = [...options, { label: 'Child Resource', value: 'Child Resource' }];
    }

    return options;
};

const Row = ({
    i,
    error,
    item,
    parentResource,
    childResources,
    onChange,
    onError,
    deleteSchemaItem,
}) => {
    let select1 = (
        <Select
            size="sm"
            value={item.type}
            options={getOptions({
                hasChildren: childResources.length,
                hasParent: parentResource,
            })}
            onChange={newValue => {
                let newItem = { name: item.name, type: newValue };
                if (newValue === 'Child Resource') {
                    newItem.childId = childResources[0].id;
                } else if (newValue === 'Faker.js') {
                    newItem.fakerMethod = fakerMethods[0].value;
                }
                onChange(i, newItem);
            }}
        />
    );

    let select2;

    if (item.type === 'Child Resource') {
        select2 = (
            <Select
                size="sm"
                value={item.childId}
                options={childResources.map(r => ({ label: r.name, value: r.id }))}
                onChange={newValue => onChange(i, { ...item, childId: newValue })}
            />
        );
    } else if (item.type === 'Faker.js') {
        select2 = (
            <Select
                size="sm"
                value={item.fakerMethod}
                onChange={newValue => onChange(i, { ...item, fakerMethod: newValue })}
                options={fakerMethods}
            />
        );
    }

    let button = (
        <IconButton
            type="button"
            iconName="X"
            tooltip="Remove field"
            onClick={() => deleteSchemaItem(i)}
        />
    );

    if (item.type === 'Object ID' || item.type === 'Parent ID') {
        select1 = <Input value={item.type} disabled />;
        button = null;
    }

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-10 gap-2 group items-center">
                <div className="col-span-3">
                    <Input
                        value={item.name}
                        placeholder="Field name"
                        onChange={({ target }) => {
                            if (validFieldName(target.value)) {
                                onChange(i, { ...item, name: target.value });
                            }
                        }}
                        onBlur={() => {
                            if (!item.name) {
                                onError(i, new Error('Invalid field name'));
                            }
                        }}
                    />
                </div>
                <div className="col-span-3">{select1}</div>
                <div className="col-span-3">{select2}</div>
                <div className="col-span-1 transition opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                    {button}
                </div>
            </div>
            {error && (
                <Alert textOnly variant="danger">
                    {error.message}
                </Alert>
            )}
        </div>
    );
};

class ResourceSchemaEditor extends Component {
    render() {
        return (
            <div className="space-y-2">
                {this.renderRows()}
                <div className="pt-2">
                    <IconButton
                        variant="primary"
                        type="button"
                        iconName="Plus"
                        tooltip="Add field"
                        onClick={this.props.addSchemaItem}
                    />
                </div>
            </div>
        );
    }

    renderRows = () => {
        const { errors, schema, childResources, parentResource } = this.props;

        return schema.map((item, i) => (
            <Row
                key={i}
                i={i}
                error={errors[i]}
                item={item}
                parentResource={parentResource}
                childResources={childResources}
                onChange={this.props.onSchemaItemChange}
                onError={this.props.onSchemaError}
                deleteSchemaItem={this.props.deleteSchemaItem}
            />
        ));
    };
}

export default ResourceSchemaEditor;

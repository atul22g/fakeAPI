const PROJECT_NAME_REGEX = /^[\w -]*$/;
const RESOURCE_NAME_REGEX = /^[\w|-]*$/;
const PROJECT_PREFIX_REGEX = /^[\w-/]*$/;
const SCHEMA_FIELD_REGEX = /^[\w-.]*$/;

export const validProjectName = name => PROJECT_NAME_REGEX.test(name);
export const validResourceName = name => RESOURCE_NAME_REGEX.test(name);
export const validPrefix = prefix => PROJECT_PREFIX_REGEX.test(prefix);
export const validFieldName = field => SCHEMA_FIELD_REGEX.test(field);

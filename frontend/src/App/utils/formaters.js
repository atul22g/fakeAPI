export const formatPrefix = (value = '') => {
  const regex = /\/(\/+)/g;
  let prefix = value.trim().replace(regex, '/');

  if (prefix.length) {
    if (prefix[0] !== '/') {
      prefix = `/${prefix}`;
    }

    if (prefix[prefix.length - 1] === '/') {
      prefix = prefix.substr(0, prefix.length - 1);
    }
  }

  return prefix;
};

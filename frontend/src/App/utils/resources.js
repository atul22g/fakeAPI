export const resetCount = resources => {
  return resources.map(r => ({
    ...r,
    count: 0,
    children: resetCount(r.children),
  }));
};

export const updateCount = (resources, action) => {
  return resources.map(r => {
    if (r.id === action.resourceId) {
      let children = r.children;
      if (action.count < r.count) {
        children = resetCount(children);
      }
      return {
        ...r,
        count: action.count,
        children,
      };
    }

    return {
      ...r,
      children: updateCount(r.children, action),
    };
  });
};

export const generateAll = resources => {
  return resources.map(r => {
    return {
      ...r,
      count: 50,
      children: generateAll(r.children),
    };
  });
};

export const findResource = (id, resources) => {
  let result = null;

  resources.forEach(r => {
    if (!result) {
      result = r.id === id ? r : findResource(id, r.children);
    }
  });

  return result;
};

export const findParentResource = (id, resources, parent) => {
  let result = null;

  resources.forEach(r => {
    if (!result) {
      result = r.id === id ? parent : findParentResource(id, r.children, r);
    }
  });

  return result;
};

export const updateResources = (updatedResource, resources) => {
  return resources.map(r => {
    if (r.id === updatedResource.id) {
      return {
        ...r,
        ...updatedResource,
      };
    }

    return {
      ...r,
      children: updateResources(updatedResource, r.children),
    };
  });
};

export const deleteResource = (resourceId, resources) => {
  return resources.reduce((result, r) => {
    if (r.id === resourceId) {
      return result;
    }

    return [
      ...result,
      {...r, children: deleteResource(resourceId, r.children)},
    ];
  }, []);
};

import get from 'lodash/get';

export const MARGIN = { top: 30, bottom: 20, left: 25, right: 20 };
export const LINK_WIDTH = 150;
export const NODE_WIDTH = 106;
export const NODE_HEIGHT = 25;

export const getBaseUrl = ({ resourceTreeId, prefix }) => {
  return prefix
    ? `https://${resourceTreeId}.mockapi.io${prefix}`
    : `https://${resourceTreeId}.mockapi.io`;
};

export const getHeight = resources => {
  return resources && resources.length
    ? resources.reduce(
        (height, { children }) =>
          height + NODE_HEIGHT * 2 + getHeight(children),
        0
      )
    : 0;
};

export const getWidth = resources => {
  const widths = resources.map(({ children }) =>
    children.length ? LINK_WIDTH + getWidth(children) : LINK_WIDTH
  );
  return Math.max(...widths);
};

export const nodeX = col => LINK_WIDTH * col + (LINK_WIDTH - NODE_WIDTH) / 2;
export const nodeY = row => NODE_HEIGHT * 2 * row;

export const conX = col => col * LINK_WIDTH;
export const conY = row => row * NODE_HEIGHT * 2 + NODE_HEIGHT / 2;

export const linkPoints = ({ col, row, isLeaf, parent, sibling }) => {
  const x = col * LINK_WIDTH;
  const y = row * NODE_HEIGHT * 2 + NODE_HEIGHT / 2;
  let points = [{ x, y }];

  if (parent) {
    points = [{ x, y: parent.y + NODE_HEIGHT / 2 - 1 }, ...points];
  } else if (sibling) {
    points = [{ x, y: sibling.y + NODE_HEIGHT / 2 - 1 }, ...points];
  } else {
    points = [{ x, y: y - NODE_HEIGHT * 2 }, ...points];
  }

  return [
    ...points,
    isLeaf ? { x: x + LINK_WIDTH / 2, y } : { x: x + LINK_WIDTH, y },
  ];
};

export const tree = params => {
  let {
    resources,
    nodes = [],
    links = [],
    connectors = [],
    row = 0,
    col = 0,
    parent,
    baseUrl,
    demo,
  } = params;

  resources.forEach(({ id, name, count, children }, i) => {
    const mockUrl = demo
      ? ''
      : parent
      ? `${parent.mockUrl}/1/${name}`
      : `${baseUrl}/${name}`;

    const node = {
      id,
      name,
      count,
      mockUrl,
      x: nodeX(col),
      y: nodeY(row),
      canGenerate: !parent || parent.count,
    };

    const sibling =
      i === 0 ? null : nodes.find(({ id }) => resources[i - 1].id);

    nodes = [...nodes, node];

    links = [
      ...links,
      {
        id: `${col}-${row}`,
        points: linkPoints({
          col,
          row,
          parent,
          sibling,
          isLeaf: !children.length,
        }),
      },
    ];

    connectors = [
      ...connectors,
      {
        x: conX(col),
        y: conY(row),
        node: {
          id,
          name,
          children,
          parent: parent ? { id: parent.id, name: parent.name } : null,
        },
      },
    ];

    if (children.length) {
      const result = tree({
        resources: children,
        parent: node,
        col: col + 1,
        row: row + 1,
        nodes,
        links,
        connectors,
        demo,
      });

      nodes = result.nodes;
      links = result.links;
      connectors = result.connectors;
      row = result.row;
    } else {
      row++;
    }
  });

  return { nodes, links, connectors, row };
};

export const findChild = (node, children) => {
  let child = null;

  children.forEach(c => {
    if (!child) {
      if (c.id === node.id) {
        child = c;
      } else {
        child = findChild(node, c.children);
      }
    }
  });

  return child;
};

export const canConnect = (sourceNode, connectorNode) => {
  if (
    sourceNode.id === connectorNode.id ||
    sourceNode.name === connectorNode.name ||
    get(sourceNode, 'parent.id') === connectorNode.id ||
    get(connectorNode, 'parent.id') === sourceNode.id ||
    connectorNode.children.find(({ name }) => name === sourceNode.name) ||
    findChild(connectorNode, sourceNode.children)
  ) {
    return false;
  }

  return true;
};

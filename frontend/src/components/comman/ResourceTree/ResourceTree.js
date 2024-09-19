import React from 'react';


const ResourceTree = () => {
  return (
    <div className="overflow-x-hidden box-border -mx-4 px-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="505" height="300">
      <defs>
        <linearGradient id="bg" y1="0" y2="1">
          <stop offset="0%" stopColor="cornflowerblue" />
          <stop offset="100%" stopColor="dodgerblue" />
        </linearGradient>
      </defs>
      <g transform="translate(45, 30)">
        <g id="links">
          <path fill="none" className="stroke-gray-300" strokeWidth="2" d="M0,12.5L150,12.5" />
          <path fill="none" className="stroke-gray-300" strokeWidth="2" d="M150,11.5L150,62.5L225,62.5" />
          <path fill="none" className="stroke-gray-300" strokeWidth="2" d="M0,11.5L0,112.5L75,112.5" />
          <path fill="none" className="stroke-gray-300" strokeWidth="2" d="M0,11.5L0,162.5L75,162.5" />
        </g>
        <g id="nodes">
          {[
            { label: 'users', count: 0, transform: 'translateX(22px) translateY(0px)' },
            { label: 'posts', count: 0, transform: 'translateX(172px) translateY(50px)' },
            { label: 'comments', count: 0, transform: 'translateX(22px) translateY(100px)' },
            { label: 'likes', count: 0, transform: 'translateX(22px) translateY(150px)' },
          ].map(({ label, count, transform }) => (
            <g className="group" opacity="1" style={{ transform, transformOrigin: '53px 2.8px' }} key={label}>
              <rect className="cursor-pointer fill-gray-200" rx="6" ry="6" width="106" height="25" />
              <rect
                className="pointer-events-none"
                rx="5"
                ry="5"
                x="1"
                y="1"
                height="23"
                fill="url(#bg)"
                width="0px"
                style={{ transformOrigin: '1px 12.5px' }}
              />
              <text textAnchor="middle" className="text-fill-gray-900 font-mono font-medium text-sm" x="53" dy="-5">
                {label}
              </text>
              <text
                className="pointer-events-none text-sm font-semibold font-mono text-gray-900"
                x="53"
                y="18.5"
                style={{
                  textShadow: 'white 0.5px 0px, white 0px 0.5px, white 0px -0.5px, white -0.5px 0px',
                  textAnchor: 'middle',
                }}
              >
                {count}
              </text>
            </g>
          ))}
        </g>
        <g id="connectors">
          {[
            { transform: 'translateX(0px) translateY(12.5px)' },
            { transform: 'translateX(150px) translateY(62.5px)' },
            { transform: 'translateX(0px) translateY(112.5px)' },
            { transform: 'translateX(0px) translateY(162.5px)' },
          ].map((style, index) => (
            <g key={index} style={style}>
              <circle r="4" className="fill-gray-100 stroke-2 stroke-gray-300" />
              <circle r="20" className="cursor-pointer transition fill-gray-300/70 opacity-0 hover:opacity-100" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  </div>
  )
}

export default ResourceTree






// export class ResourceTree extends Component {
//   render() {
//     const {
//       project: { id, resources, prefix, resourceTreeId },
//       isDemo,
//       selectedResourceId,
//     } = this.props;
//     const demo = id === 'fake';
//     const width = getWidth(resources) + MARGIN.left + MARGIN.right + 160;
//     const height = Math.max(
//       getHeight(resources) + MARGIN.top + MARGIN.bottom,
//       300
//     );
//     const baseUrl = getBaseUrl({ resourceTreeId, prefix });
//     const { nodes, links, connectors } = tree({ resources, baseUrl, demo });

//     return (
   
//     );
//   }

//   selectResource = resource => {
//     const id = get(resource, 'id');
//     const { selectedResourceId } = this.props;
//     if (id === selectedResourceId) {
//       this.props.selectResource(null);
//       return;
//     }
//     this.props.selectResource(id);
//   };

//   showResourceDataModal = resourceId =>
//     this.props.showForm(RESOURCE_DATA, this.props.project, resourceId);

//   showEditResourceModal = resourceId =>
//     this.props.showForm(EDIT_RESOURCE, this.props.project, resourceId);

//   showDeleteResourceModal = resourceId =>
//     this.props.showForm(DELETE_RESOURCE, this.props.project, resourceId);
// }

// export default compose(
//   // withRouter,
//   connect(
//     ({ projectDetails }, { match }) => ({
//       project: detailsById(projectDetails, match.params.id),
//       selectedResourceId: getSelectedResourceId(projectDetails),
//     }),
//     dispatch =>
//       bindActionCreators(
//         {
//           selectResource,
//           updateRelation,
//           generateData,
//           showForm,
//           addToRoot,
//         },
//         dispatch
//       )
//   )
// )(ResourceTree);

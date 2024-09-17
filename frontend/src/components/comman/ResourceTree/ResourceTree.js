import {
  DELETE_RESOURCE,
  EDIT_RESOURCE,
  RESOURCE_DATA,
} from '../../../reducers/forms';
import {MARGIN, getBaseUrl, getHeight, getWidth, tree} from '../utils';
import React, {Component} from 'react';
import {addToRoot, updateRelation} from '../../../actions/resources';
import {bindActionCreators, compose} from 'redux';
import {
  detailsById,
  getSelectedResourceId,
} from '../../../reducers/projectDetails';

import ConnectorLayer from './ConnectorLayer';
import Link from './Link';
import Node from './Node';
import {connect} from 'react-redux';
import {generateData} from '../../../actions/data';
import get from 'lodash/get';
import {selectResource} from '../../../actions/projectDetails';
import {showForm} from '../../../actions/forms';
// import { withRouter } from 'react-router-dom';

export class ResourceTree extends Component {
  render() {
    const {
      project: {id, resources, prefix, resourceTreeId},
      isDemo,
      selectedResourceId,
    } = this.props;
    const demo = id === 'fake';
    const width = getWidth(resources) + MARGIN.left + MARGIN.right + 160;
    const height = Math.max(
      getHeight(resources) + MARGIN.top + MARGIN.bottom,
      300
    );
    const baseUrl = getBaseUrl({resourceTreeId, prefix});
    const {nodes, links, connectors} = tree({resources, baseUrl, demo});

    return (
      <div className="overflow-x-hidden box-border -mx-4 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          style={{pointerEvents: 'none'}}
          onClick={() => selectedResourceId && this.selectResource(null)}>
          <defs>
            <linearGradient id="bg" y1="0" y2="1">
              <stop offset="0%" stopColor="cornflowerblue" />
              <stop offset="100%" stopColor="dodgerblue" />
            </linearGradient>
          </defs>
          <g transform={`translate(${MARGIN.left + 20}, ${MARGIN.top})`}>
            <g id="links">
              {links.map((link, i) => (
                <Link key={link.id} isFirst={i === 0} link={link} />
              ))}
            </g>
            <g id="nodes">
              {nodes.map(node => (
                <Node
                  isDemo={isDemo}
                  key={node.id}
                  node={node}
                  projectId={id}
                  onSelect={() => this.selectResource(node)}
                  selected={node.id === selectedResourceId}
                  generateData={this.props.generateData}
                  showResourceDataModal={this.showResourceDataModal}
                  showEditResourceModal={this.showEditResourceModal}
                  showDeleteResourceModal={this.showDeleteResourceModal}
                />
              ))}
            </g>
            <ConnectorLayer
              resources={resources}
              connectors={connectors}
              width={width}
              height={height}
              projectId={id}
              updateRelation={this.props.updateRelation}
              addToRoot={this.props.addToRoot}
            />
          </g>
        </svg>
      </div>
    );
  }

  selectResource = resource => {
    const id = get(resource, 'id');
    const {selectedResourceId} = this.props;
    if (id === selectedResourceId) {
      this.props.selectResource(null);
      return;
    }
    this.props.selectResource(id);
  };

  showResourceDataModal = resourceId =>
    this.props.showForm(RESOURCE_DATA, this.props.project, resourceId);

  showEditResourceModal = resourceId =>
    this.props.showForm(EDIT_RESOURCE, this.props.project, resourceId);

  showDeleteResourceModal = resourceId =>
    this.props.showForm(DELETE_RESOURCE, this.props.project, resourceId);
}

export default compose(
  // withRouter,
  connect(
    ({projectDetails}, {match}) => ({
      project: detailsById(projectDetails, match.params.id),
      selectedResourceId: getSelectedResourceId(projectDetails),
    }),
    dispatch =>
      bindActionCreators(
        {
          selectResource,
          updateRelation,
          generateData,
          showForm,
          addToRoot,
        },
        dispatch
      )
  )
)(ResourceTree);

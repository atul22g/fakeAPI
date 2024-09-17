import { MARGIN, canConnect } from '../utils';
import React, { Component } from 'react';
import { select, pointer } from 'd3-selection';

import Connector from './Connector';

class ConnectorLayer extends Component {
  state = {
    isFetching: false,
    source: null,
    destination: null,
    start: null,
    end: null,
    snap: false,
    _: null,
    node: null,
    x: 0,
    y: 0,
  };

  componentDidMount() {
    select(this.groupEl).on('mousemove', this.onMousemove);
    window.addEventListener('keyup', this.onKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeypress);
  }

  render() {
    const _ = this.state._;
    // const node = this.state.node;
    const { resources, connectors, width, height } = this.props;
    const { source, start, end } = this.state;
    const canAddToRoot =
      source != null && _.find(resources, { name: source.name }) == null;

    const line =
      start && end ? (
        <g className="drop-shadow-md pointer-events-none">
          <line
            className="stroke-[4] stroke-white pointer-events-none"
            strokeLinecap="round"
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
          />
          <line
            className="stroke-2 stroke-emerald-500 pointer-events-none"
            strokeLinecap="round"
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
          />
        </g>
      ) : null;

    return (
      <g id="connectors" ref={ref => (this.groupEl = ref)}>
        {start && (
          <rect
            x={-MARGIN.left}
            y={-MARGIN.top}
            width={width}
            height={height}
            pointerEvents="all"
            className="pointer-events-auto fill-none"
            style={{ pointerEvents: 'all' }}
            onClick={this.resetState}
          />
        )}
        {canAddToRoot && (
          <g
            transform={`translate(${[-MARGIN.left - 20, -MARGIN.top + 6]})`}
            className="cursor-pointer text-sm">
            <rect
              width={20}
              height={height - 6}
              rx={6}
              ry={6}
              className="fill-gray-200 hover:fill-gray-300"
              onClick={({ shiftKey }) => {
                this.addToRoot(shiftKey);
              }}
            />
            <text
              y="50%"
              dy="-2"
              transform={`rotate(-90, 10, ${(height - 6) / 2})`}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none">
              Add to root
            </text>
          </g>
        )}
        {connectors.map((c) => (
          <Connector
            key={c.node.id}
            connector={c}
            selected={this.isSelected(c.node.id)}
            connecting={source}
            canConnect={!source || canConnect(source, c.node)}
            onClick={clone => this.select(c, clone)}
            snap={() => this.snap(c)}
            unsnap={() => this.unsnap()}
            resetConnectors={this.resetState}
          />
        ))}
        {line}
      </g>
    );
  }

  isSelected = id => {
    const { source, destination } = this.state;
    return (
      (source && id === source.id) || (destination && id === destination.id)
    );
  };

  select = ({ node, x, y }, clone) => {
    const { projectId, updateRelation } = this.props;
    const { isFetching, source } = this.state;

    if (isFetching) {
      return;
    }

    if (source) {
      if (source.id === node.id) {
        return this.resetState();
      }

      this.setState({
        isFetching: true,
        destination: node,
        end: { x, y },
      });

      setTimeout(() => {
        const { destination } = this.state;
        if (destination) {
          updateRelation({
            projectId,
            clone,
            sourceId: source.id,
            destinationId: destination.id,
            callback: this.resetState,
          });
        }
      }, 300);
    } else {
      this.setState({
        source: node,
        start: { x, y },
      });
    }
  };

  addToRoot = clone => {
    const { projectId, addToRoot } = this.props;
    const { isFetching, source } = this.state;
    const { node,x,y } = this.state;

    if (isFetching) {
      return;
    }

    if (source) {
      this.setState({
        isFetching: true,
      });

      setTimeout(() => {
        addToRoot({
          projectId,
          clone,
          sourceId: source.id,
          callback: this.resetState,
        });
      }, 300);
    } else {
      this.setState({
        source: node,
        start: { x, y },
      });
    }
  };

  onKeypress = ({ key }) => {
    if (key === 'Escape') {
      if (!this.state.isFetching) {
        this.resetState();
      }
    }
  };

  onMousemove = () => {
    const { isFetching, source, destination, snap } = this.state;

    if (source && !destination && !snap && !isFetching) {
      const [x, y] = pointer(this.groupEl);
      this.setState({ end: { x, y } });
    }
  };

  snap = ({ x, y }) => {
    const { isFetching, start } = this.state;
    if (!isFetching && start) {
      this.setState({ snap: true, end: { x, y } });
    }
  };

  unsnap = () => {
    const { isFetching, start } = this.state;
    if (!isFetching && start) {
      this.setState({ snap: false });
    }
  };

  resetState = () => {
    this.setState({
      isFetching: false,
      source: null,
      destination: null,
      start: null,
      end: null,
      snap: false,
    });
  };
}

export default ConnectorLayer;

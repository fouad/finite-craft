/*
 * This example shows how you can use custom nodes and edges to dynamically add elements to your react flow graph.
 * A global layouting function calculates the new positions for the nodes every time the graph changes and animates existing nodes to their new position.
 *
 * There are three ways of adding nodes to the graph:
 *  1. Click an existing node: Create a new child node of the clicked node
 *  2. Click on the plus icon of an existing edge: Create a node in between the connected nodes of the edge
 *  3. Click a placeholder node: Turn the placeholder into a "real" node to prevent jumping of the layout
 *
 * The graph elements are added via hook calls in the custom nodes and edges. The layout is calculated every time the graph changes (see hooks/useLayout.ts).
 */
import ReactFlow, {
  Background,
  Edge,
  MarkerType,
  Node,
  ProOptions,
  ReactFlowProvider,
} from 'reactflow'

import useLayout from './hooks/useLayout'
import nodeTypes from './NodeTypes'
import edgeTypes from './EdgeTypes'

import 'reactflow/dist/style.css'
import { useEffect, useState } from 'react'

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true }

// initial setup: one workflow node and a placeholder node
// placeholder nodes can be turned into a workflow node by click
const initNodes = (start: string, end: string): Node[] => [
  {
    id: '1',
    data: { label: start },
    position: { x: 0, y: 0 },
    type: 'workflow',
  },
  {
    id: '1-a',
    data: { label: '' },
    position: { x: 200, y: 0 },
    type: 'merge',
  },
  {
    id: '2',
    data: { label: '' },
    position: { x: 0, y: 0 },
    type: 'generated',
  },
  {
    id: '2-a',
    data: { label: '' },
    position: { x: 200, y: 0 },
    type: 'merge',
  },

  {
    id: '3',
    data: { label: '' },
    position: { x: 0, y: 0 },
    type: 'generated',
  },
  {
    id: '3-a',
    data: { label: '' },
    position: { x: 200, y: 0 },
    type: 'merge',
  },
  {
    id: '4',
    data: { label: end },
    position: { x: 0, y: 150 },
    type: 'goal',
  },
]

// initial setup: connect the workflow node to the placeholder node with a placeholder edge
const defaultEdges: Edge[] = [
  {
    id: '1=>1-a',
    source: '1',
    sourceHandle: 'right',
    target: '1-a',
    type: 'straight',
    markerStart: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '1=>2',
    source: '1',
    target: '2',
    type: 'straight',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '2=>2-a',
    source: '2',
    sourceHandle: 'right',
    target: '2-a',
    type: 'straight',

    markerStart: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '2=>3',
    source: '2',
    target: '3',
    type: 'straight',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '3=>3-a',
    source: '3',
    sourceHandle: 'right',
    target: '3-a',
    type: 'straight',

    markerStart: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: '3=>4',
    source: '3',
    target: '4',
    type: 'straight',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
]

const fitViewOptions = {
  padding: 0.95,
}

function ReactFlowComponent({ nodes }: { nodes: Node[] }) {
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout()

  return (
    <>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={defaultEdges}
        proOptions={proOptions}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        minZoom={0.2}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnDoubleClick={false}
        // we are setting deleteKeyCode to null to prevent the deletion of nodes in order to keep the example simple.
        // If you want to enable deletion of nodes, you need to make sure that you only have one root node in your graph.
        deleteKeyCode={null}
      >
        <Background />
      </ReactFlow>
    </>
  )
}

function ReactFlowWrapper() {
  const [state, setState] = useState({ nodes: [] as Node[] })

  useEffect(() => {
    fetch('/api/wotd?day=2024-03-24')
      .then((r) => r.json())
      .then((wotd) => {
        const { steps, ingredients, target } = wotd
        // @ts-ignore
        window._ingredients = ingredients
        setState({ nodes: initNodes(steps[0][0] as string, target as string) })
      })
  })

  if (!state.nodes || state.nodes.length === 0) {
    return null
  }

  return (
    <ReactFlowProvider>
      <ReactFlowComponent nodes={state.nodes} />
    </ReactFlowProvider>
  )
}

export default ReactFlowWrapper

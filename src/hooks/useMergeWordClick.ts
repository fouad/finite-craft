import { NodeProps, useReactFlow } from 'reactflow'

import { uuid, randomLabel } from '../utils'

// this hook implements the logic for clicking a placeholder node
// on placeholder node click: turn the placeholder and connecting edge into a workflow node
export function useMergeWordClick(id: NodeProps['id']) {
  const { getNodes, getNode, setNodes, setEdges } = useReactFlow()

  const onClick = () => {
    // we need the parent node object for getting its position
    const parentNode = getNode(id)

    if (!parentNode) {
      return
    }

    // create a unique id for the placeholder node that will be added as a child of the clicked node
    const childPlaceholderId = uuid()

    // create a placeholder node that will be added as a child of the clicked node
    const childPlaceholderNode = {
      id: childPlaceholderId,
      // the placeholder is placed at the position of the clicked node
      // the layout function will animate it to its new position
      position: { x: parentNode.position.x, y: parentNode.position.y },
      type: 'placeholder',
      data: { label: '+' },
    }

    // we need a connection from the clicked node to the new placeholder
    const childPlaceholderEdge = {
      id: `${parentNode.id}=>${childPlaceholderId}`,
      source: parentNode.id,
      target: childPlaceholderId,
      type: 'placeholder',
    }

    const result = prompt('What word you like to use?')
    let index = -1

    setNodes((nodes) =>
      nodes.map((node, idx) => {
        // here we are changing the type of the clicked node from placeholder to workflow
        if (node.id === id) {
          index = idx
          return {
            ...node,
            type: 'merge',
            data: { label: result },
          }
        }
        return node
      })
    )

    setTimeout(async () => {
      const nodes = getNodes()
      const merged = await fetch('/api/merge?' + new URLSearchParams({
        first: nodes[index - 1].data.label,
        second: result || '',
      }).toString(), {
        method: 'GET',
      }).then(r => r.json())
      console.log(merged)

      setNodes((nodes) =>
        nodes.map((node, idx) => {
          // here we are changing the type of the clicked node from placeholder to workflow
          if (idx === (index + 1)) {
            return {
              ...node,
              type: 'workflow',
              data: { label: merged.result },
            }
          }
          return node
        })
      )
    }, 0)

    /*
    setNodes((nodes) =>
      nodes
        .map((node) => {
          // here we are changing the type of the clicked node from placeholder to workflow
          if (node.id === id) {
            return {
              ...node,
              type: 'workflow',
              data: { label: randomLabel() },
            };
          }
          return node;
        })
        // add the new placeholder node
        .concat([childPlaceholderNode])
    );

    setEdges((edges) =>
      edges
        .map((edge) => {
          // here we are changing the type of the connecting edge from placeholder to workflow
          if (edge.target === id) {
            return {
              ...edge,
              type: 'workflow',
            };
          }
          return edge;
        })
        // add the new placeholder edge
        .concat([childPlaceholderEdge])
    );
    */
  }

  return onClick
}

export default useMergeWordClick

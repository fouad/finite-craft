import { NodeProps, useReactFlow } from 'reactflow'
import fx from 'fireworks'

let range = (n: Number) => [...new Array(n)]

import { uuid, randomLabel } from '../utils'
import { Dispatch, SetStateAction } from 'react'

// this hook implements the logic for clicking a placeholder node
// on placeholder node click: turn the placeholder and connecting edge into a workflow node
export function useMergeWordClick(
  id: NodeProps['id'],
  state: {
    open: boolean
  },
  setState: Dispatch<
    SetStateAction<{
      open: boolean
    }>
  >
) {
  const { getNodes, getNode, setNodes, setEdges } = useReactFlow()

  const onClick = async () => {
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
    //@ts-ignore
    window._prompt = (value: string) => {
      return value
    }
    const promise: Promise<string> = new Promise((resolve) => {
      //@ts-ignore
      window._prompt = resolve
    })
    setState({ open: true })
    const result = await promise
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
      const merged = await fetch(
        '/api/merge?' +
          new URLSearchParams({
            first: nodes[index - 1].data.label as string,
            second: result || '',
          }).toString(),
        {
          method: 'GET',
        }
      ).then((r) => r.json())

      setNodes((nodes) =>
        nodes.map((node, idx) => {
          if (idx === index + 1) {
            if (idx === nodes.length - 1) {
              const success =
                nodes[nodes.length - 1].data.label === merged.result
              if (success) {
                range(6).map(() =>
                  fx({
                    x:
                      (Math.random() * window.innerWidth) / 2 +
                      window.innerWidth / 4,
                    y:
                      (Math.random() * window.innerWidth) / 4 +
                      window.innerWidth / 4,
                    colors: ['#0984e3', '#4CAF50', '#81C784'],
                  })
                )
              }

              return {
                ...node,
                type: 'goal',
                data: {
                  ...node.data,
                  success,
                },
              }
            }

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

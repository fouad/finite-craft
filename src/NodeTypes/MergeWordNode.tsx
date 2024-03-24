import { memo, useMemo, useState } from 'react'
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow'
import cx from 'classnames'

import styles from './NodeTypes.module.css'
import usePlaceholderClick from '../hooks/usePlaceholderClick'
import useMergeWordClick from '@/hooks/useMergeWordClick'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const MergeWordNode = ({ id, data }: NodeProps) => {
  // see the hook implementation for details of the click handler
  // calling onClick turns this node and the connecting edge into a workflow node
  const { getNodes } = useReactFlow()
  const nodeClasses = cx(
    styles.node,
    styles.merge,
    data.label && styles.hasValue
  )
  const [state, setState] = useState({ open: false })
  const onClick = useMergeWordClick(id, state, setState)
  // @ts-ignore
  const potentialWords = window._ingredients || ['Tree', 'Train', 'Bus', 'Taco']
  const ns = getNodes()
  const prevNode = useMemo(() => {
    return ns[ns.findIndex((node) => node.id === id) - 1]
  }, [id, ns.map((n) => n.data.label || '')])

  return (
    <>
      <div onClick={onClick} className={nodeClasses}>
        {data.label}
        <Handle
          className={styles.handle}
          type="target"
          position={Position.Left}
          isConnectable={false}
        />
      </div>

      <Drawer
        open={state.open}
        onClose={() => {
          // @ts-ignore
          window._prompt('')
          setState({ open: false })
        }}
      >
        <DrawerContent
          onClose={() => {
            // @ts-ignore
            window._prompt('')
            setState({ open: false })
          }}
          className="text-center"
        >
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl my-3">
              Pick a word to combine{' '}
              {prevNode.data.label && (
                <>
                  with{' '}
                  <span className="px-2 py-1 rounded-lg bg-blue-200">
                    {prevNode.data.label}
                  </span>
                </>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="max-w-sm mx-auto w-full mb-6">
            {potentialWords.map((word: string) => {
              return (
                <div
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg py-3 px-6 mb-3 cursor-pointer text-3xl font-bold"
                  key={word}
                  onClick={() => {
                    // @ts-ignore
                    window._prompt(word)
                    setState({ open: false })
                  }}
                >
                  {word}
                </div>
              )
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default memo(MergeWordNode)

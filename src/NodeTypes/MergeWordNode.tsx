import { memo, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
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

const potentialWords = ['Tree', 'Train', 'Bus', 'Taco']

const MergeWordNode = ({ id, data }: NodeProps) => {
  // see the hook implementation for details of the click handler
  // calling onClick turns this node and the connecting edge into a workflow node
  const nodeClasses = cx(
    styles.node,
    styles.merge,
    data.label && styles.hasValue
  )
  const [state, setState] = useState({ open: false })
  const onClick = useMergeWordClick(id, state, setState)

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
        <DrawerContent className="text-center">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              What word you like to combine?
            </DrawerTitle>
          </DrawerHeader>
          <div className="max-w-sm mx-auto w-full">
            {potentialWords.map((word) => {
              return (
                <div
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg py-3 px-6 mb-3 cursor-pointer"
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
